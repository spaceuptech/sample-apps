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
        display:'none'
    },
    avatar: {
        margin: 10,
        background: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
});


const ChatListItem = (props) => {
    const { classes, data, openDiscussion, active } = props;
    
    const [excerpt, setExcerpt] = useState(_.last(data.messages.text))

    useEffect(()=>{
        setExcerpt(_.last(props.data.messages))
    },[props.data])

    return (
        <ListItem alignItems="flex-start" className={classnames(classes.container, { [classes.active]: active })} onClick={() => openDiscussion(data)}>
            <ListItemAvatar>
                {<Avatar className={classes.avatar}>{data.user.name.charAt(0)}</Avatar>}
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography className={classes.palName}>{data.user.name} <span className={classnames(classes.activeDot, {[classes.hidden]: !data.user.isActive})}></span></Typography>
                }
                secondary={
                    <React.Fragment>
                        {excerpt?excerpt.text:"Empty chat"}
                    </React.Fragment>
                }
            />
        </ListItem >
    )
}


const mapStateToProps = (state) => ({
    
});
const mapDispatchToProps = (dispatch) => ({
    loadChatList: () => dispatch(ChatActions.loadChatList()),
    openDiscussion: (chatData) => dispatch(ChatActions.openDiscussion(chatData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatListItem));
