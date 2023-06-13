import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

interface LoadingProps {
    content?: string
}

const Loading: React.FC<LoadingProps> = ({ content = 'loading' }) => {
    return (
        <Grid item xs={12} container className={styles.loadCtn} justifyContent='center' direction='column' alignItems='center'>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                size={30}
                thickness={4}
                className={styles.loadCir}
            />
            <Box className={styles.loadContent}>
                <Typography>{content}</Typography>
                <span className={clsx(styles.el, styles.l1)}>.</span>
                <span className={clsx(styles.el, styles.l2)}>.</span>
                <span className={clsx(styles.el, styles.l3)}>.</span>
            </Box>
        </Grid>

    );
};

export default Loading;
