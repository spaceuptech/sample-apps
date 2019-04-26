import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ChatMessage from './ChatMessage';
import classNames from 'classnames'

import { ChatActions } from '../../actions/chat.actions';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: '100%',
        background: '#F5F5F5',
        display: 'flex',
        flexFlow: 'column',
    },
    chatStartNotice: {
        color: '#999999',
        fontSize: '16px'
    }
});

const ChatDiscussion = (props) => {
    const { classes, className, data } = props;

    return (
        <Grid container justify="flex-start" alignItems="center" direction="column" className={classNames(classes.root, className)}>
            <Typography className={classes.chatStartNotice}>This is the very beginning of your chat with {data.user.name}.</Typography>
            {
                data.messages.map((message, idx) => (
                    <ChatMessage message={message} incoming={message.from === data.user._id} key={idx} />
                ))
            }
        </Grid>
    )
}


const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    loadChatList: () => dispatch(ChatActions.loadChatList()),
    sendMessage: (id, text) => dispatch(ChatActions.sendMessage(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatDiscussion));

