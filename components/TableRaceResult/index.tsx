import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0d1321",
        color: theme.palette.common.white,
        border: '1px solid #ffffff14'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface DataResult {
    grandprix: string,
    date: string,
    car: string,
    lap: string,
    winner: string
    time: string
}

interface CustomizedTableProps {
    dataRace: DataResult[];
    loading: boolean;
}



export default function TableRaceResult({ dataRace = [], loading }: CustomizedTableProps) {


    return (
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }} >
            <Table sx={{ minWidth: 700, }} aria-label="customized table" size='small'>
                <TableHead >
                    <TableRow>
                        <StyledTableCell>GRAND PRIX</StyledTableCell>
                        <StyledTableCell align="right">DATE</StyledTableCell>
                        <StyledTableCell align="right">WINNER</StyledTableCell>
                        <StyledTableCell align="right">Carb</StyledTableCell>
                        <StyledTableCell align="right">LAPS</StyledTableCell>
                        <StyledTableCell align="right">TIME</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: '#edeff1' }}>
                    {dataRace.map((r) => (
                        <StyledTableRow key={uuidv4()}>
                            <StyledTableCell component="th" scope="row">
                                {r.grandprix}
                            </StyledTableCell>
                            <StyledTableCell align="right">{r.date}</StyledTableCell>
                            <StyledTableCell align="right">{r.winner}</StyledTableCell>
                            <StyledTableCell align="right">{r.car}</StyledTableCell>
                            <StyledTableCell align="right">{r.lap}</StyledTableCell>
                            <StyledTableCell align="right">{r.time}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}