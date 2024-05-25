import { useState, useEffect} from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { ToastContainer, toast } from "react-toastify"
import { AUTH_API } from "@/components/utils/serverURL"
import router from "next/router"
import axios from "axios"

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

const ChatLogs = () => {
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))

  useEffect(() => {
    setUserID(localStorage.getItem("userID"))
    if (userID !== "") {
      setIsLoading(true)
      axios
        .post(AUTH_API.GET_CHAT, { userID }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const chatLogs = response.data;
            setChatLog(chatLogs);
          }
          setIsLoading(false)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT});
          setIsLoading(false)
        })
    }
  }, [userID])

  const handleRowClick = (sessionId) => {
    router.push(`/log/log?sessionId=${sessionId}`);
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-start text-black_8 font-bold pt-[20px] mb-[10px] text-[20px]">
        Chat logs
      </div>
      <TableContainer component={Paper} className="p-5">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell align="center">End</StyledTableCell>
              <StyledTableCell align="center">Chatbot</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chatLog.map((row) => (
              <StyledTableRow key={row.id} onClick={()=>handleRowClick(row.session_id)}>
                <StyledTableCell align="center">{row.created_at}</StyledTableCell>
                <StyledTableCell align="center">{row.ended_at}</StyledTableCell>
                <StyledTableCell align="center">{row.bot_name}</StyledTableCell>
           
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  )
}

export default ChatLogs
