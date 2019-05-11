import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {  NavBar, Chat, ChatDrawer } from '../../components'
import { ReactComponent as SectionBackground } from '../../assets/no_chat_loaded_background.svg';
import { Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { UserActions } from '../../actions/user.actions';
import IdleTimer from 'react-idle-timer'
import UserDirectoryDialog from '../../components/UserDirectoryDialog/UserDirectoryDialog';
import Hidden from '@material-ui/core/Hidden';


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
            fontSize: '24px',
            textAlign: 'center'
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
    const [isMobileOpen, setMobileOpen] = useState(false)
    const [isUserDirectoryOpen, openUserDirectory] = useState(false);

    const setActive = () => {
        props.updateUserActivity(true, Date.now())
    }

    const setInactive = () => {
        props.updateUserActivity(false, Date.now())
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!!!isMobileOpen);
    };
    
    return (
        <div className={classes.root}>
            <IdleTimer
                element={document}
                onActive={setActive}
                onIdle={setInactive}
                onAction={setActive}
                debounce={250}
                timeout={5000} />
            <NavBar onToggle={handleDrawerToggle}/>
            <UserDirectoryDialog open={isUserDirectoryOpen} onClose={() => openUserDirectory(false)} />
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor='left'
                    open={isMobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <ChatDrawer onFabClick={() => openUserDirectory(true)} onChatOpen={handleDrawerToggle}/>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    className={classes.drawer}

                >
                    <div className={classes.toolbar} />
                    <ChatDrawer onFabClick={() => openUserDirectory(true)} onChatOpen={()=>{}}/>
                </Drawer>
            </Hidden>
            
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
                            <Grid item style={{ padding: '10px' }}>
                                <Typography className={classes.snippetText}><span className={classes.spanText}>Select a Chat and</span> say Hi! to your friends!</Typography>
                            </Grid>
                            <Grid item style={{ padding: '10px' }}>
                                <SectionBackground style={{ maxWidth: '100%' }} />
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
    updateUserActivity: (isActive, lastActiveTime) => dispatch(UserActions.setUserActive(isActive, lastActiveTime))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatPage));

