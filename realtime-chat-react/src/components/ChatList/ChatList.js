import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';
import classNames from 'classnames'
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
    const { classes, chatsList } = props;

    const [activeChatID, setActiveChatID] = useState(ChatConstants.NO_CHAT_OPENED)

    useEffect(() => {
        if (props.opened !== ChatConstants.NO_CHAT_OPENED) {
            setActiveChatID(props.chatsList[props.opened]._id)
        }
    }, [props])

    useEffect(() => props.loadChatList(), []);

    return (
        <List className={classNames(classes.root, props.className)}>
            {
                (chatsList.length > 0) ?
                    chatsList.map((entry, idx) => (
                            <ChatListItem key={idx} data={entry} active={props.opened === idx} />
                    )) :
                    <Typography>No chat started yet</Typography>
            }
        </List>
    )
}

const mapStateToProps = (state) => ({
    chatsList: state.chat.list,
    opened: state.chat.opened
});
const mapDispatchToProps = (dispatch) => ({
    loadChatList: () => dispatch(ChatActions.loadChatList())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatList));
