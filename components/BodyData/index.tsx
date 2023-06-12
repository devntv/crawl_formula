import { Box, Grid, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import TableRaceResult from '../TableRaceResult';
import styles from './styles.module.css';

interface RaceData {
    grandprix: string;
    date: string;
    car: string;
    time: string;
    lap: string;
    winner: string
}

interface RaceResult {
    year: string;
    data: RaceData[];
}

const StyledFormControl = styled(FormControl)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'transparent',
    },
    '& .MuiInput-root': {
        borderBottom: 'none',
    },
    '& .MuiOutlinedInput-root': {
        borderBottom: 'none'
    },
    '& .MuiInput-root.MuiSelect-root::before': {
        borderBottom: 'none',

    }
});


function BodyData() {
    const [dataRace, setDataRace] = useState<RaceResult[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getDataRace() {
            const response = await fetch("/api/raceResult");
            const data = await response.json();
            setDataRace(data);
            setLoading(false);
            localStorage.setItem('raceData', JSON.stringify(data));
        }
        const storedData = localStorage.getItem('raceData');
        if (storedData) {
            setDataRace(JSON.parse(storedData));
            setLoading(false);
        } else {
            getDataRace();
        }
        // getDataRace();
    }, []);

    // In ra giá trị mới của state "dataRace"

    const [year, setYear] = useState('2023');

    const handleChange = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };


    const raceResult = useMemo(() => dataRace.filter((result) => result.year === year)[0], [dataRace, year])

    console.log('raceResult', dataRace);
    return (
        <Grid container className={styles.bodyctn}>
            <Grid item xs={12} style={{ display: 'flex', maxHeight: '60px' }} justifyContent='center' alignItems='center' >
                <Grid>
                    <Box className={styles.searchCtn}>
                        <TextField sx={{
                            border: 'none',
                            '& .MuiOutlinedInput-notchedOutline': {
                                display: 'none',
                            },
                        }}
                            className={styles.inp}
                            classes={{
                                root: styles.root_input,
                            }}
                            placeholder='Search somthing...'
                        />

                        <StyledFormControl variant="standard" className={styles.fctrl}>
                            <Select
                                value={year}
                                onChange={handleChange}
                                displayEmpty
                                disableUnderline
                                inputProps={{ 'aria-label': 'Without label' }}
                                defaultValue={loading ? '2023' : ''}

                            >

                                {dataRace?.map((raceResult) => {
                                    return (
                                        <MenuItem key={raceResult.year} value={raceResult.year} >
                                            {raceResult.year}
                                        </MenuItem>
                                    )

                                })}
                            </Select>
                        </StyledFormControl>

                    </Box>

                </Grid>

                <BiSearch className={styles.si} />
            </Grid>
            <Grid container>
                <Grid item xs={12} style={{ display: 'flex', padding: '40px' }} justifyContent='center'>
                    <TableRaceResult dataRace={raceResult?.data || []} loading={loading} />
                </Grid>
            </Grid>
        </Grid >
    )
}

export default BodyData