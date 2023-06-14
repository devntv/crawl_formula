import { Grid, Typography } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BACKGROUND_CHART, BORDER_CHART } from '../../constant';
import styles from './styles.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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
    team?: string
}

interface CustomizedChartProps {
    dataRaces: DataResult[][];
    field: string
    loading: boolean
}

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

export function ChartRace(props: CustomizedChartProps) {
    const { dataRaces = [], field, loading } = props;

    // console.log('xc', dataRaces[0]);
    // console.log('countWinner', field);
    const updateChartData = (field: string) => {
        let labels: string[] = []
        let data: any[] = []
        let label: string = ''
        if (field === 'races') {
            const driverJoinRaces: any[] = []
            dataRaces[0]?.forEach(data => driverJoinRaces.push(data?.winner))
            const dataWinners = Object.values(driverJoinRaces.reduce((acc, val) => {
                const name = val?.split(' ')[0] || '';
                acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {}));
            labels = Array.from(new Set(driverJoinRaces))
            data = dataWinners
            label = 'total win'
        }
        if (field === 'drivers') {
            const driversArr: string[] = []
            const rankingArr: string[] = []
            dataRaces[0]?.forEach(data => driversArr.push(data?.driver))
            dataRaces[0]?.forEach(d => rankingArr.push(d?.pts))
            labels = driversArr
            data = rankingArr
            label = 'point ranking'
        }
        if (field === 'teams') {
            const teamsArr: string[] = []
            const teamsRanking: string[] = []
            dataRaces[0]?.forEach(t => teamsArr.push(t.team))
            dataRaces[0]?.forEach(pr => teamsRanking.push(pr.pts))
            labels = teamsArr
            data = teamsRanking
            label = 'team point'
        }
        if (field === 'DHL') {
            const driverDHL: string[] = []
            dataRaces[0]?.forEach(dhl => driverDHL.push(dhl.driver))
            const awardDriverData = Object.values(driverDHL.reduce((acc, val) => {
                const name = val?.split(' ')[0] || '';
                acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {}));
            labels = Array.from(new Set(driverDHL))
            data = awardDriverData
            label = 'total award'
        }

        const dataCharts = {
            labels,
            datasets: [
                {
                    label,
                    data,
                    backgroundColor: BACKGROUND_CHART,
                    borderColor: BORDER_CHART,
                    borderWidth: 1,
                },
            ],
        }
        return dataCharts
    };

    const dataPieChart = updateChartData(field);
    // console.log('chart', dataPieChart);

    return (
        <Grid container className={styles.chartCtn} justifyContent='center'>
            <Grid item xs={12} className={styles.chartl} >
                {!loading && <Typography style={{ textTransform: 'uppercase' }}>{`${field} ranking`}</Typography>}
                <Pie data={dataPieChart} />
            </Grid>
        </Grid>
    )
}
