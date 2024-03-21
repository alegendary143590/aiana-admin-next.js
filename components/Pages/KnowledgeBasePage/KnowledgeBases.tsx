import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import { Typography } from "@mui/material"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import router from "next/router"
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

const KnowledgeBases = () => {

    function createData(
        id: number,
        name: string,
        created: string
    ) {
        return { id, name, created };
    }

    const [rows, setRows] = React.useState([
        createData(1, 'Cook Recipient', '2024.03.12'),
        createData(2, 'Hospital Insurance', '2024.03.12'),
        createData(3, 'Surfing Expert', '2024.03.12'),
        createData(4, 'Yoga Specialist', '2024.03.12'),
        createData(5, 'General Data', '2024.03.12'),
    ]);

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    }

    const handleAddRow = () => {
        router.push(`/knowledge/edit?base=0`)
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

   

    return (
        <>
            <div className="w-full h-[50px] flex items-center justify-center pt-[20px] mb-[10px] text-[28px]">
                <Typography className="text-[30px] underline">Knowledge Bases</Typography>
                <Button onClick={handleAddRow} className="bg-[#0099ff] text-white absolute right-5 font-bold py-2 px-4 rounded m-2" variant="contained">
                    + New
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Created</StyledTableCell>
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
                                <StyledTableCell align="center"><Actions baseId={row.id} onDelete={() => handleDeleteRow(row.id)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default KnowledgeBases
