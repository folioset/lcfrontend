import { Button, Fade, Link, makeStyles, MenuItem, Modal, Theme, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { ChallengeFeed, User } from '../../types';
import Avatar from '../shared/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';
import UpdateChallenge from './UpdateChallenge';
import DeleteChallenge from './DeleteChallenge';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import useDisclosure from '../../hooks/useDisclosure';
import { useQueryClient } from 'react-query';

interface FeedchallengeProps {
    challenge: ChallengeFeed;
    isPublic?: boolean;
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

const FeedChallenge: React.FC<FeedchallengeProps> = ({ challenge, isPublic }) => {
    const classes = useStyles();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>('user')!;


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Update Challenge Toggler
    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onClose: onUpdateClose,
    } = useDisclosure();

    // Delete Confirm Toggler
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose,
    } = useDisclosure();

    // authorizing deletetion of question
    if (user._id === challenge.createdBy._id) isPublic = false;

    return (
        <>

            {/* Update challenge */}
            <Modal
                open={isUpdateOpen}
                onClose={onUpdateClose}
                aria-labelledby='project-file'
                aria-describedby='pdf file of the project'>
                <UpdateChallenge onClose={onUpdateClose} challenge={challenge} />
            </Modal>

            {/* Delete challenge */}
            <Modal
                open={isDeleteOpen}
                onClose={onDeleteClose}
                aria-labelledby='challenge-file'
                aria-describedby='pdf file of the challenge'>
                <DeleteChallenge onClose={onDeleteClose} challenge={challenge} />
            </Modal>

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
                    action={
                        !isPublic ? (
                            <>
                                <div>
                                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                        <MoreHorizIcon />
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={onUpdateOpen}>Edit Challenge</MenuItem>
                                        <MenuItem onClick={onDeleteOpen}>Delete Challenge</MenuItem>
                                    </Menu>
                                </div>
                            </>
                        ) : null
                    }
                />
                <ChallengeCard isPublic challenge={challenge} />
            </Card>
        </>
    );
};

export default FeedChallenge;
