import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { ChatActions } from '../../actions/chat.actions';
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { ChatConstants } from '../../constants/chat.constants';

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
    container: {
        cursor: 'pointer',
        '&:hover': {
            background: "#F0F0F0",
        },
    },
    palName: {
        fontWeight: 'bold'
    },
    activeDot: {
        width: '8px',
        height: '8px',
        display: 'inline-block',
        background: '#51DB98',
        borderRadius: '900px',
        border: '1px solid #51DB98',
    },
    hidden: {
        display: 'none'
    },
    avatar: {
        margin: 10,
        background: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
});


const ChatListItem = (props) => {
    const { classes, openDiscussion } = props;
    const [excerpt, setExcerpt] = useState("")
    const [partner, setPartner] = useState({})
    const [isActive, setActive] = useState(false)


    useEffect(() => {
        if (props.openedChat !== ChatConstants.NO_CHAT_OPENED) {
            const chat = props.chats.find((chat)=>chat._id === props.openedChat)
            const isLoaded = (chat.from === partner._id) || (chat.to === partner._id)
            setActive(isLoaded)
        }
    }, [props.openedChat])

    useEffect(() => {
        if (props.partner) {
            setExcerpt(_.last(props.messages[props.discussion]))
            setPartner(props.partner)
        }
    }, [props])

    return (
        <ListItem alignItems="flex-start"
            className={classnames(classes.container, { [classes.active]: isActive })}
            onClick={() => {
                openDiscussion(props.discussion);
                props.onUserSelect()
            }}>
            <ListItemAvatar>
                {<Avatar className={classes.avatar}>{partner.name ? partner.name.charAt(0).toUpperCase() : ""}</Avatar>}
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography className={classes.palName}>
                        {partner.name} <span className={classnames(classes.activeDot, { [classes.hidden]: !partner.isActive })}></span>
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        {excerpt ? excerpt.text : "Empty chat"}
                    </React.Fragment>
                }
            />
        </ListItem >
    )
}


const mapStateToProps = (state) => ({
    openedChat: state.chat.opened,
    messages: state.chat.messages,
    chats: state.chat.chats
});
const mapDispatchToProps = (dispatch) => ({
    openDiscussion: (partnerID) => dispatch(ChatActions.openChat(partnerID))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatListItem));
