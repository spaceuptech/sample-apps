import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChatList, ChatSearch } from '../../components'
import { connect } from 'react-redux';
import { UserActions } from '../../actions/user.actions';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => {
    return {
        chatList: {
            overflow: 'auto',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
                height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
            },
            [theme.breakpoints.up('sm')]: {
                height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
            },
        },
        newMessageFab: {
            position: 'absolute',
            right: "10px",
            bottom: "10px",
        }
    }
};

const ChatDrawer = (props) => {
    const { classes } = props;

    return (<React.Fragment>
        <ChatSearch />
        <ChatList className={classes.chatList} onUserSelect={props.onChatOpen}/>
        <Fab color="primary" aria-label="Add" className={classes.newMessageFab} onClick={props.onFabClick}>
            <ChatIcon />
        </Fab>
    </React.Fragment>)
}

const mapDispatchToProps = (dispatch) => ({
    updateUserActivity: (isActive, lastActiveTime) => dispatch(UserActions.setUserActive(isActive, lastActiveTime))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ChatDrawer));

