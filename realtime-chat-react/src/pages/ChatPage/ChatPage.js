import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ChatList, NavBar, Chat, ChatSearch } from '../../components'
import { ReactComponent as SectionBackground } from '../../assets/no_chat_loaded_background.svg';
import { Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { UserActions } from '../../actions/user.actions';
import IdleTimer from 'react-idle-timer'
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import UserDirectoryDialog from '../../components/UserDirectoryDialog/UserDirectoryDialog';


const drawerWidth = 300;

const styles = theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'flex-start'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            flex: 1,
            width: '100%',
            height: '100vh'
        },
        toolbar: theme.mixins.toolbar,
        snippetText: {
            paddingBottom: theme.spacing.unit * 5,
            paddingTop: theme.spacing.unit * 5,
            fontSize: '24px'
        },
        spanText: {
            color: '#BDBDBD'
        },
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

const ChatPage = (props) => {
    const { classes, opened } = props;

    const [isUserDirectoryOpen, openUserDirectory] = useState(false);
    const setActive = () => {
        props.updateUserActivity(true, Date.now())
    }

    const setInactive = () => {
        props.updateUserActivity(false, Date.now())
    }

    return (
        <div className={classes.root}>
            <IdleTimer
                element={document}
                onActive={setActive}
                onIdle={setInactive}
                onAction={setActive}
                debounce={250}
                timeout={5000} />
            <NavBar />
            <UserDirectoryDialog open={isUserDirectoryOpen} onClose={() => openUserDirectory(false)} />
            < Drawer classes={{
                paper: classes.drawerPaper,
            }
            }
                className={classes.drawer}
                variant="permanent" >
                <div className={classes.toolbar} />
                <ChatSearch />
                <ChatList className={classes.chatList} />
                <Fab color="primary" aria-label="Add" className={classes.newMessageFab} onClick={() => openUserDirectory(true)}>
                    <ChatIcon />
                </Fab>
            </Drawer >
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    (opened === -1) ?
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography className={classes.snippetText}><span className={classes.spanText}>Select a Chat and</span> say Hi! to your friends!</Typography>
                            </Grid>
                            <Grid item>
                                <SectionBackground />
                            </Grid>
                        </Grid>
                        :
                        <Chat discussionID={opened} />
                }

            </main>
        </div >
    )
}

const mapStateToProps = (state) => ({
    messages: state.chat.messages,
    users: state.chat.users,
    chatsList: state.chat.list,
    opened: state.chat.opened,
});
const mapDispatchToProps = (dispatch) => ({
    updateUserActivity: (active, lastActiveTime) => dispatch(UserActions.setUserActive(active, lastActiveTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatPage));

