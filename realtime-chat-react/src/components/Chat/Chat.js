import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChatHeader from './ChatHeader';
import ChatDiscussion from './ChatDiscussion';
import ChatSend from './ChatSend';
import { ChatActions } from '../../actions/chat.actions';
import { connect } from 'react-redux'



const styles = theme => ({
    chat: {
        width: '100%',
        background: '#F5F5F5',
        // backgroundColor: theme.palette.background.paper,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            minHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
            maxHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
            maxHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
        },
        display: 'flex',
        flexFlow: 'column',
    },
    discussion: {
        flexGrow: 1,
        overflow: 'auto'
    },
    root: {
        background: '#F5F5F5',
        backgroundColor: theme.palette.background.paper,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
        },
        [theme.breakpoints.up('sm')]: {
            height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
        },
        flexGrow: 1
    },
    sendBox: {
        padding: '30px 100px'
    },
});

const Chat = (props) => {
    const { classes, sendMessage, discussionID } = props;

    const discussion = Object.values(props.chats).filter(chat => chat._id === discussionID)[0]
    const to = discussion.to
    const from = discussion.from
    const palID = (to === props.localUser._id) ? from : to
    const partner = props.users[palID]

    return (
        <div className={classes.root}>
            <ChatHeader user={partner} />
            <Grid className={classes.chat}>
                <ChatDiscussion messages={props.messages[discussionID]} partner={partner} className={classes.discussion} />
                <ChatSend item className={classes.sendBox}
                    onSubmit={text => sendMessage(discussionID, text)} />
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chats: state.chat.chats,
    users: state.chat.users,
    messages: state.chat.messages,
    opened: state.chat.opened,
    localUser: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
    sendMessage: (discussionID, text) => dispatch(ChatActions.sendMessage(discussionID, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));

