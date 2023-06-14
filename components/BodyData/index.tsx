import { Box, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Loading from '../Loading';
import StarThemes from '../StarThemes';
import TableRaceResult from '../TableRaceResult';
import { MAP_CONTENT_DHL, MAP_TITLE } from '../utils';
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
    borderRight: 'none !important',
    position: 'relative',
    margin: 0
});


function BodyData() {
    const [dataRace, setDataRace] = useState<RaceResult[]>([])
    const [loading, setLoading] = useState(false)
    const [year, setYear] = useState('2023');
    const [field, setField] = useState('races');

    useEffect(() => {
        async function getDataRace() {
            setLoading(true);
            const response = await fetch("/api/raceResult");
            const data = await response.json();
            setDataRace(data);
            localStorage.setItem('raceData', JSON.stringify(data));
            setLoading(false);
        }
        const storedData = localStorage.getItem('raceData');
        if (storedData) {
            setDataRace(JSON.parse(storedData));
            setLoading(false);
        } else {
            getDataRace();
        }
    }, []);

    // In ra giá trị mới của state "dataRace"
    const handleChangeField = (event: SelectChangeEvent) => {
        const selectedField = event.target.value;
        setField(selectedField);
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(event.target.value);
    };
    // console.log(loading);
    return (
        <>
            <Grid container className={styles.bodyctn}>
                <Grid item xs={12} style={{ display: 'flex', maxHeight: '60px' }} justifyContent='center' alignItems='center' >
                    <Box className={styles.searchCtn}>
                        <StylesFormF sx={{ m: 1, minWidth: 120, textTransform: 'uppercase', }} className={styles.fctrl} variant="standard">
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                displayEmpty
                                disableUnderline
                                label="Age"
                                value={field}
                                disabled={loading}
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
                                disabled={loading}
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
                <Grid container item xs={12} className={clsx(loading ? styles.hide : styles.titleTable)}>
                    <Typography>{`${year} ${MAP_TITLE[field]}`}</Typography>
                    <Typography className={styles.contentTable}>
                        {field === 'DHL' && MAP_CONTENT_DHL}
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} className={styles.tableCtn} justifyContent='center'>
                        {loading ? <Loading content='please wait a moment, about 40s' />
                            : <TableRaceResult filterData={dataRace.filter((raceResult) => raceResult.year === year).map((raceResult) => raceResult[field])} loading={loading} />}
                    </Grid>
                    <StarThemes />
                </Grid>
            </Grid >
        </>
    )
}

export default BodyData