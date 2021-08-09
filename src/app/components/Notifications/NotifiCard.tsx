import * as React from 'react';
import { useHistory } from 'react-router-dom';

// Material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { format, formatDistance, getDate, subDays } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles, Theme } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// types
import { NotifiType, User } from '../../types';
import Avatar from '../shared/Avatar';
import theme from '../../theme';

interface NotifiItemProps {
    notifi: NotifiType;
    isNew: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        avatar: {
            height: '4rem',
            width: '4rem',
        },
        detailsGrid: {
            paddingLeft: theme.spacing(3),
            alignItems: 'flex-start',

            [theme.breakpoints.down('xs')]: {
                alignItems: 'center',
            },
        },
        projectsNum: {
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(2),
            },
        },
        notifiHighlight: {
            backgroundColor: '#cbf2f2',
            borderBottom: '2px solid',
            borderBottomColor: theme.palette.divider,
            borderRadius: 0
        },
        notifiDefault: {
            backgroundColor: theme.palette.common.white,
            borderBottom: '2px solid',
            borderBottomColor: theme.palette.divider,
            borderRadius: 0
        },
        notifiIcon: {
            position: 'absolute',
            top: 5,
            left: 5,
            fontSize: 15,
            color: theme.palette.primary.main
        }
    };
});

const NotifiCard: React.FC<NotifiItemProps> = ({ notifi, isNew }) => {
    const history = useHistory();
    const classes = useStyles();

    // console.log(notifi);


    return (
        <>
            <Card
                // onClick={() => history.push(`/public/users/${user._id ?? user.id}`)}
                className={isNew ? classes.notifiHighlight : classes.notifiDefault}
            >
                <CardActionArea>
                    <CardContent>
                        <Grid container>
                            {isNew ? <FiberManualRecordIcon className={classes.notifiIcon} /> : null}
                            <Grid item sm={1} xs={2}>
                                <Avatar
                                    className={classes.avatar}
                                    alt={notifi?.notifyfrom}
                                    src={notifi?.notifyfromprofile}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                direction='column'
                                sm={9}
                                xs={10}
                                className={classes.detailsGrid}>
                                <Grid item>
                                    <Typography gutterBottom variant='h6'>
                                        {notifi.notifyfromname}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {notifi.message && (
                                        <Typography variant='body2' style={{ textAlign: 'initial' }} gutterBottom>
                                            {notifi.message}
                                        </Typography>
                                    )}
                                </Grid>
                                {/* <Grid item>
                                    <Typography variant='body2' color='textSecondary'>
                                        {notifi.location}
                                    </Typography>
                                </Grid> */}
                            </Grid>
                            <Hidden only={['sm', 'md', 'xl', 'lg']}>
                                <Grid item xs={2}></Grid>
                            </Hidden>
                            <Grid
                                item
                                container
                                sm={2}
                                xs={10}
                                justify='center'
                                className={classes.projectsNum}>
                                <Typography variant='h5' color='primary' style={{ fontWeight: 500 }}>
                                    {format(
                                        new Date(notifi.timenotified!),
                                        'dd MMMM yyyy'
                                    )}
                                    {/* {formatDistance(subDays(new Date(notifi.timenotified!), 0), new Date(notifi.timenotified!), { addSuffix: true })} */}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default NotifiCard;




//temporary
// export type Notifications = {
// 	userid: string,
// 	notifyfrom: string,
// 	notifyfromname: string,
// 	notifyfromprofile: string,
// 	timenotified: Date,
// 	message: string,
// 	projectid: string,
// }