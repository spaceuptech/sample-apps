import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0
    },
});

const ChatList = (props) => {
    const { classes } = props;
    return (
        <List className={classNames(classes.root, props.className )}>
            <ChatListItem randID={1} isSelected={true} />
            <ChatListItem randID={2} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
            <ChatListItem randID={3} />
        </List>
    )
}

export default withStyles(styles)(ChatList);
