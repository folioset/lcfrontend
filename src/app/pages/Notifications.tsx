import {
    Container,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
// import UserItem from '../../components/User/UserItem';
// import useAuthRoute from '../../hooks/useAuthRoute';
// import { User } from '../../types';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Fuse from 'fuse.js';
import NotifiCard from '../components/Notifications/NotifiCard';
import { NotifiType } from '../types';

interface NotifiProps { }

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            backgroundColor: theme.palette.common.white,
            borderWidth: 5,
            borderColor: '#111111',
            elevation: 0,
            boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            marginBottom: theme.spacing(3),
        },
        searchInput: {
            marginBottom: theme.spacing(3),
        },
        usersCard: {
            textAlign: 'center',
        },
    };
});

const Notifications: React.FC<NotifiProps> = () => {
    // const location = useLocation();
    // useAuthRoute(location.pathname);
    // const [users, setUsers] = React.useState<User[]>([]);

    const classes = useStyles();
    const { isLoading, data: notifiData } = useQuery(
        'notifications',
        async () => {
            const res = await axios({
                method: 'GET',
                url: `/api/notifications`,
            });
            return res.data;
        },
        {
            onSuccess: () => {
                console.log(notifiData);
            },
        }
    );



    console.log(notifiData);

    return (
        <>
            <Container maxWidth='md' className={classes.root}>
                <Box className={classes.usersCard}>
                    {isLoading && <Typography>Loading notifications....</Typography>}
                    <Grid container>
                        {notifiData?.notifications.map((notifi: NotifiType, index: number) => {
                            return (
                                <>
                                    <Grid item xs={12} key={notifi?.userid}>
                                        {index + 1 <= notifiData?.new.length ?
                                            <NotifiCard isNew={true} key={notifi?.userid} notifi={notifi} />
                                            : <NotifiCard isNew={false} key={notifi?.userid} notifi={notifi} />
                                        }
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Notifications;
