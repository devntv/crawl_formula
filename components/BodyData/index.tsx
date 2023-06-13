import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
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
    pos?: string
    driver?: string
    pts?: string
    nationally?: string
}

interface RaceResult {
    year: string;
    data: RaceData[];
}

const StylesFormF = styled(FormControl)({
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderRight: 'none !important'
})

const StyledFormControlYear = styled(FormControl)({
    '& .MuiInput-underline:after': {
        borderBottomColor: 'transparent',
    },
    backgroundColor: '#fa6e9d',
    // 
    borderRight: 'none !important',
    position: 'relative',
    margin: 0
});


function BodyData() {
    const [dataRace, setDataRace] = useState<RaceResult[]>([])
    const [loading, setLoading] = useState(true)
    const [year, setYear] = useState('2023');
    const [field, setField] = useState('2023');

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
    const handleChangeField = (event: SelectChangeEvent) => {
        const selectedField = event.target.value;
        setField(selectedField);

    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };


    return (
        <Grid container className={styles.bodyctn}>
            <Grid item xs={12} style={{ display: 'flex', maxHeight: '60px' }} justifyContent='center' alignItems='center' >
                <Box className={styles.searchCtn}>
                    <StylesFormF sx={{ m: 1, minWidth: 120, textTransform: 'uppercase' }} className={styles.fctrl} variant="standard">
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            displayEmpty
                            disableUnderline
                            label="Age"
                            value={field}

                            onChange={handleChangeField}
                        >
                            {dataRace && dataRace.length > 0 &&
                                Object.keys(dataRace[0]).filter(key => key !== 'year').map((key) => (
                                    <MenuItem key={key} value={key} style={{ textTransform: 'uppercase' }}>
                                        {key !== 'DHL' ? key : 'DHL FASTEST LAP AWARD'}
                                    </MenuItem>
                                ))
                            }
                        </Select>

                    </StylesFormF>

                    <StyledFormControlYear variant="standard" className={styles.fctrl}>
                        <Select
                            value={year}
                            onChange={handleChangeYear}
                            displayEmpty
                            disableUnderline
                            inputProps={{ 'aria-label': 'Without label' }}


                        >
                            {dataRace?.map((raceResult) =>
                            (
                                <MenuItem key={raceResult.year} value={raceResult.year} >
                                    {raceResult.year}
                                </MenuItem>
                            )
                            )}
                        </Select>
                    </StyledFormControlYear>
                </Box>
                <BiSearch className={styles.si} />
            </Grid>
            <Grid container>
                <Grid item xs={12} style={{ display: 'flex', padding: '40px' }} justifyContent='center'>
                    <TableRaceResult filterData={dataRace.filter((raceResult) => raceResult.year === year).map((raceResult) => raceResult[field])} loading={loading} />
                </Grid>
            </Grid>
        </Grid >
    )
}

export default BodyData