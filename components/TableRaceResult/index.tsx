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
    grandprix?: string
    date?: string
    car?: string
    lap?: string
    winner?: string
    time?: string
    pos?: string
    driver?: string
    pts?: string
    nationally?: string
}

interface CustomizedTableProps {
    filterData: DataResult[];
    loading: boolean;
}



export default function TableData(props: CustomizedTableProps) {
    const { filterData = [], loading } = props
    // console.log('setSelectedArray', filterData[0]);
    // console.log('krys', filterData[0]?.map(r => Object.values(r)))
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }} >
            <Table sx={{ minWidth: 700, }} aria-label="customized table" >
                <TableHead >
                    <TableRow style={{ textTransform: 'uppercase' }}>
                        {filterData && filterData.length > 0 && Array.isArray(filterData[0]) && filterData[0]?.map(r => Object.keys(r))[0]?.map(tablecell => (
                            <StyledTableCell key={uuidv4()} align="left">{tablecell}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: '#edeff1' }}>
                    {filterData && filterData.length > 0 && Array.isArray(filterData[0]) && filterData && filterData.length > 0 && filterData[0]?.map((r) => (
                        <StyledTableRow key={uuidv4()}>
                            {Object.values(r)?.map((value, i) => (
                                <StyledTableCell align="left" key={i}>{value as string}</StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}