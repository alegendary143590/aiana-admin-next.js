
import { useState, useEffect} from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { AUTH_API } from "@/components/utils/serverURL"
import axios from "axios"
import formatDateString from '@/components/utils/common'
import { Button } from "@mui/material"
import AlertDialog from "@/components/AlertDialog"
import { ToastContainer, toast } from "react-toastify"
import router from "next/router"

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
}))

const Tickets = () => {
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [ openDialog, setOpenDialog]= useState(false);
    const [currentItem, setCurrentItem] = useState("");

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }));

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userID");
        setIsLoading(true);
        if (userIdFromStorage!=="") {
            setUserId(userIdFromStorage);
            
            axios.post(AUTH_API.GET_TICKETS, { userId: userIdFromStorage }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
                  'Content-Type': 'application/json',  // Explicitly defining the Content-Type
                }
              })
                .then((response) => {
                    if (response.status === 200) {
                        setTickets(response.data);
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

    const handleCancelButton = (id)=> {
        setCurrentItem(id);
        setOpenDialog(true);
    }

    const handleAgree = () => {
        setOpenDialog(false);
        axios
            .post(AUTH_API.DEL_TICKET, { currentItem }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
                  'Content-Type': 'application/json',  // Explicitly defining the Content-Type
                }
              })
            .then((response) => {
              if (response.status === 201) {
                const updatedTickets = tickets.filter(ticket => ticket.id !== currentItem);
                setTickets(updatedTickets);
                toast.success("Successfully Deleted!", { position: toast.POSITION.TOP_RIGHT })
              }
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
            })
    }

    const handleDisagree = ( ) => {
        setOpenDialog(false);
    }

    if(isLoading || !userId){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <div className="w-full h-[50px] flex items-center justify-start text-black_8 font-bold pt-[20px] mb-[10px] text-[20px]">
                Tickets
            </div>
            {tickets.length === 0? (
                        <div className="text-center w-full">There is no ticket</div>
                    ): (
            <TableContainer component={Paper} className="p-5">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Website</StyledTableCell>
                        <StyledTableCell align="center">Content</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Created at</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { tickets.map((row, index) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{index+1}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center">{row.website}</StyledTableCell>
                            <StyledTableCell align="center">{row.content}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">{formatDateString(row.created_at)}</StyledTableCell>
                            <StyledTableCell align="center"><Button color="error" variant="contained" className="bg-red-700 text-white" onClick={ ()=>handleCancelButton(row.id)}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> )}
            <AlertDialog
                title="Confirm Delete"
                description="Are you sure you want to delete this item? This action cannot be undone."
                handleAgree={handleAgree}
                handleDisagree={handleDisagree}
                open={openDialog}
                setOpen={setOpenDialog}
                />
                <ToastContainer />
        </div>
    )
}

export default Tickets
