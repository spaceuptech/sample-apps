import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    active: {
        background: '#F5F5F5',
        borderLeft: '6px solid #51DB98',
        paddingLeft: '10px'
    },
    container:{

    },
    palName: {
        fontWeight: 'bold'
    },
    
    avatar: {
        margin: 10,
        background: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
});


const ChatListItem = ({ randID, isSelected, classes }) => {
    return (
        <ListItem alignItems="flex-start" className={classNames(classes.container, { [classes.active]: isSelected === true })}>
            <ListItemAvatar>
                {<Avatar className={classes.avatar}>J</Avatar>

                    /* <Avatar alt="Remy Sharp" src={`https://placeimg.com/50/50/people?${randID}`} /> */}
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography className={classes.palName}>John Doe</Typography>
                }
                secondary={
                    <React.Fragment>
                        {"Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                }
            />
        </ListItem >
    )
}

export default withStyles(styles)(ChatListItem);
