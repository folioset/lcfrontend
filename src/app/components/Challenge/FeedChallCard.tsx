import { Link, makeStyles, Theme, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { ChallengeFeed } from '../../types';
import Avatar from '../shared/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';

interface FeedchallengeProps {
    challenge: ChallengeFeed;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        name: {
            cursor: 'pointer',
            fontSize: 17,
            fontWeight: 520,
        },
        root: {
            marginBottom: theme.spacing(4),
            borderRadius: 10,
            borderWidth: 5,
            borderColor: '#111111',
            elevation: 0,
            boxShadow: '0 0 3px 1px rgba(0, 0, 0, 0.1)',
            marginLeft: 'auto',
        },
    };
});

const FeedChallenge: React.FC<FeedchallengeProps> = ({ challenge }) => {
    const classes = useStyles();
    // console.log("challenge created", challenge.createdBy);

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={<Avatar aria-label='user' src={challenge.createdBy?.profilePicture} />}
                    title={
                        <Link
                            component={RouterLink}
                            to={`/public/users/${challenge}`}
                            className={classes.name}
                            color='secondary'
                            variant='h4'>
                            {challenge.createdBy?.name}
                        </Link>
                    }
                    subheader={<Typography variant='body2'>{challenge.createdBy?.about}</Typography>}
                />
                <ChallengeCard isPublic challenge={challenge} />
            </Card>
        </>
    );
};

export default FeedChallenge;
