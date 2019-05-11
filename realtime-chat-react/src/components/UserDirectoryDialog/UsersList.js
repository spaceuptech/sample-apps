import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import UsersListItem from './UsersListItem';
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

const UsersList = (props) => {
    const { classes, users, startChatWith } = props;
    
    return (
        <List className={classnames(classes.root, props.className)}>
            {
                (Object.keys(users).length > 0) ?
                    Object.values(users).map((singleUser, idx) => (
                        <UsersListItem
                            key={idx}
                            active={singleUser.isActive}
                            user={singleUser}
                            onClick={()=>{props.onUserSelect(); startChatWith(singleUser._id)}}
                        />
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
    startChatWith: (partnerID) => dispatch(ChatActions.startChatWith(partnerID))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersList));
