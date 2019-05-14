import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';
import classnames from 'classnames'
import { ChatActions } from '../../actions/chat.actions';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0
    },
});

const ChatList = (props) => {
    const { classes, chats } = props;
    useEffect(() => { props.loadInitial(); }, []);

    return (
        <List className={classnames(classes.root, props.className)}>
            {
                (chats.length > 0) ?
                    chats.map((chat, idx) => (
                        <ChatListItem
                            onUserSelect={props.onUserSelect}
                            key={idx}
                            discussion={chat._id}
                            partner={props.users[(chat.from === props.loggedUserID || chat.to === "ALL") ? chat.to : chat.from]} />
                    )) :
                    <Typography>No chat started yet</Typography>
            }
        </List>
    )
}

const mapStateToProps = (state) => ({
    loggedUserID: state.user.user ? state.user.user._id : null, 
    users: state.chat.users, 
    chats: state.chat.chats,  
    opened: state.chat.opened
});
const mapDispatchToProps = (dispatch) => ({
    loadInitial: () => dispatch(ChatActions.loadInitialData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatList));
