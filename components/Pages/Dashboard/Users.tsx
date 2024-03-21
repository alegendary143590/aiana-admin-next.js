import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Actions from "./Actions"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const Users = () => {

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    
    function createData(
      id:number,
      name: string,
      email:string,
      phone:string,
      role:string,
      lastlogin:string,
      status:string
    ) {
      return { id, name, email, phone, role, lastlogin, status}
    }
    
    const rows = [
      createData(1, "John Doe", "johndoe@example.com", "123-456-7890", "Admin", "2024-03-20", "Active"),
      createData(2, "Jane Smith", "janesmith@example.com", "987-654-3210", "User", "2024-03-19", "Active"),
      createData(3, "Alice Johnson", "alicejohnson@example.com", "555-123-4567", "User", "2024-03-18", "Inactive")
    ];
    return (
        <>
            <div className="w-full h-[50px] flex items-center justify-center text-white pt-[20px] mb-[10px] text-[28px]">
                Chatbot Instances
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell align="center">User Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Role</StyledTableCell>
                            <StyledTableCell align="center">Last Login Date</StyledTableCell>
                            <StyledTableCell align="center">Account Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center">{row.phone}</StyledTableCell>
                            <StyledTableCell align="center">{row.role}</StyledTableCell>
                            <StyledTableCell align="center">{row.lastlogin}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center"><Actions /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users
