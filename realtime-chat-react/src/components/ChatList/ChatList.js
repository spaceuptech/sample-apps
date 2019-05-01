import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';
import classnames from 'classnames'
import { ChatActions } from '../../actions/chat.actions';
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { ChatConstants } from '../../constants/chat.constants';


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

    useEffect(() => { props.loadInitial() }, []);

    return (
        <List className={classnames(classes.root, props.className)}>
            {
                (chats.length > 0) ?
                    chats.map((entry, idx) => (
                        <ChatListItem
                            key={idx}
                            active={props.opened === entry._id}
                            partner={props.users[(entry.from === props.loggedUserID) ? entry.to : entry.from]} />
                    )) :
                    <Typography>No chat started yet</Typography>
            }
        </List>
    )
}

const mapStateToProps = (state) => ({
    loggedUserID: state.user.user._id, // a list of Chat objects 
    users: state.chat.users, // a list of Chat objects 
    chats: state.chat.chats, // a list of Chat objects 
    opened: state.chat.opened
});
const mapDispatchToProps = (dispatch) => ({
    loadInitial: () => dispatch(ChatActions.loadInitialData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatList));
