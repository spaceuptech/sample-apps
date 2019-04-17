import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});

const ChatList = (props) => {
    const { classes } = props;
    return (
        <List className={classes.root}>
            <ChatListItem randID={1} />
            <ChatListItem randID={2} />
            <ChatListItem randID={3} />
        </List>
    )
}

export default withStyles(styles)(ChatList);
