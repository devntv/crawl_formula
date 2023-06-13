import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { BiLinkAlt } from 'react-icons/bi';
import styles from './styles.module.css';

function Footer() {
    return (
        <Grid container className={styles.footerMain}>
            <Grid item xs={6}  >
                <Box className={styles.ftl}>
                    <Image src="/images/vrl.png" alt='vrillar' width={30} height={30} />
                    <Typography>Vrillar</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} justifyContent='flex-end' style={{ display: 'flex' }} >
                <Grid item className={styles.fi} alignItems='center'>
                    <a href='https://vinhdz.site/'> <BiLinkAlt /></a>
                    <a href='https://github.com/devntv'> <AiFillGithub /></a>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default Footer