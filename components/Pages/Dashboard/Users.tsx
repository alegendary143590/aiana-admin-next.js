import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"
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

const Users = () => {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))

  function createData(id: number, name: string, result: string, start: string, end: string) {
    return { id, name, result, start, end }
  }

  const rows = [
    createData(1, "Laura", "Resolved", "15:05 21/03/2024", "15:11 21/03/2024"),
    createData(2, "Laura", "E-mail sent", "15:05 21/03/2024", "15:11 21/03/2024"),
    createData(3, "Laura", "Resolved", "15:05 21/03/2024", "15:11 21/03/2024"),
  ]

  const handleRowClick = () => {
    router.push("/log")
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
              <StyledTableCell align="center">Result</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id} onClick={handleRowClick}>
                <StyledTableCell align="center">{row.start}</StyledTableCell>
                <StyledTableCell align="center">{row.end}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    className={`m-0 ${
                      row.result === "Resolved" ? "bg-[#33a186]" : "bg-sky-400"
                    }  rounded-[5px] px-2 text-white inline-block text-[12px]`}
                  >
                    {row.result}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
