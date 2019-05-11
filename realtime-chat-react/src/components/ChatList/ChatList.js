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
                    chats.map((entry, idx) => (
                        <ChatListItem
                            onUserSelect={props.onUserSelect}
                            key={idx}
                            active={props.opened === entry._id}
                            discussion={entry._id}
                            partner={props.users[(entry.from === props.loggedUserID || entry.to === "ALL") ? entry.to : entry.from]} />
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
