import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import RunButton from "./RunButton"
import PublishButton from "./PublishButton"
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

const Assistants = () => {

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
      created: string
    ) {
      return { id, name, created};
    }
    
    const rows = [
      createData(1, 'Cook Assistant', '2024.03.12'),
      createData(2, 'Lawyer Assistant', '2024.03.12'),
      createData(3, 'Surfing Assistant', '2024.03.12'),
      createData(4, 'Yoga Assistant', '2024.03.12'),
      createData(5, 'General Assistant', '2024.03.12'),
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
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Created</StyledTableCell>
                            <StyledTableCell align="center">Run</StyledTableCell>
                            <StyledTableCell align="center">Publish</StyledTableCell>
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
                            <StyledTableCell align="center">{row.created}</StyledTableCell>
                            <StyledTableCell align="center"><RunButton /></StyledTableCell>
                            <StyledTableCell align="center"><PublishButton /></StyledTableCell>
                            <StyledTableCell align="center"><Actions /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Assistants
