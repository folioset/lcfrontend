import { Grid, makeStyles, Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import FeedProject from '../Project/FeedProjectCard';
import SideBtnCard from '../User/SideBtnCard';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            padding: theme.spacing(1),
            marginTop: 2,
        },
        heading: {
            color: theme.palette.grey['200'],
            textAlign: 'center',
            marginBottom: theme.spacing(4),
        },
        loading: {
            textAlign: 'center',
            display: 'block',
            color: theme.palette.grey['50'],
        },
        GridContr: {
            maxWidth: 900,
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            justifyContent: 'center'
        },
        check: {
            padding: theme.spacing(1),
        }
    };
});

const FeedRedirect: React.FC = () => {
    const classes = useStyles();
    const [num, setNum] = useState(1);
    const { id } = useParams<{ id: string }>()


    const { isLoading, data, refetch } = useQuery('feedRedirect', async () => {
        const res = await axios({
            method: 'get',
            url: `api/feed/getproject/${id}`,
        });
        console.log(res.data);
        return res.data;
    },
    );

    return (
        <>
            <Grid container className={classes.GridContr}>
                <Grid item xs={12} md={4} className={classes.check} >
                    <SideBtnCard />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Container maxWidth='sm' className={classes.container}>
                        {data?.map((el: any) => {
                            return <FeedProject key={id} project={el} />
                        })}
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default FeedRedirect;
