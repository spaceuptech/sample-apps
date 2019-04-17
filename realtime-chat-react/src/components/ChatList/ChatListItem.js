import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
});


const ChatListItem = (props) => {
    const { randID } = props
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={`https://placeimg.com/50/50/people?${randID}`} />
            </ListItemAvatar>
            <ListItemText
                primary="Summer BBQ"
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
