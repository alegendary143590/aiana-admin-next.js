import { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/router"
import formatDateString from '@/components/utils/common'
import { AUTH_API } from "@/components/utils/serverURL"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontWeight: "bold",
      textAlign: "left",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "left",
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
"&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
"&:last-child td, &:last-child th": {
    border: 0,
},
}));

const UserList = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userID");
        setIsLoading(true);
        if (userIdFromStorage!=="") {
            setUserId(userIdFromStorage);
            
            axios.post(AUTH_API.GET_USERS, { userId: userIdFromStorage }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
                  'Content-Type': 'application/json',  // Explicitly defining the Content-Type
                }
              })
                .then((response) => {
                    if (response.status === 200) {
                        setUsers(response.data);
                        console.log(response.data);
                    }
                    if ( response.status === 401){
                      toast.error("Please login!", {position: toast.POSITION.TOP_RIGHT});
                      router.push("/signin");
            
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                  if (error.response) {
                    console.log('Error status code:', error.response.status);
                    console.log('Error response data:', error.response.data);
                    if (error.response.status === 401){
                      toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });
        
                      router.push("/signin")
                    }
                    // Handle the error response as needed
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Error request:', error.request);
                    toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });
        
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
        
                  }
                  setIsLoading(false);
                });
        }
    }, []);


    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <div className="w-full h-[50px] flex items-center justify-start text-black_8 font-bold pt-[20px] mb-[10px] text-[20px]">
                Users
            </div>
            {users.length === 0? (
                        <div className="text-center w-full">There is no user</div>
                    ): (
            <TableContainer component={Paper} className="p-5">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Company</StyledTableCell>
                        <StyledTableCell align="center">Role</StyledTableCell>
                        <StyledTableCell align="center">Registered at</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { users.map((row, index) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center">{row.first_name + ' ' + row.last_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.com_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.role}</StyledTableCell>
                            <StyledTableCell align="center">{formatDateString(row.created_at)}</StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> )}
                <ToastContainer />
        </div>
    )
}

export default UserList;