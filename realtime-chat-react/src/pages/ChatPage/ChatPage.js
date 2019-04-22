import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ChatList, NavBar, Chat, ChatSearch } from '../../components'
import { ReactComponent as SectionBackground } from '../../assets/no_chat_loaded_background.svg';
import { Typography, Grid } from '@material-ui/core';

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
        }
    }
};

const ChatPage = ({ classes }) => {

    return (
        <div className={classes.root}>
            <NavBar />
            < Drawer classes={{
                paper: classes.drawerPaper,
            }
            }
                className={classes.drawer}
                variant="permanent" >
                <div className={classes.toolbar} />
                <ChatSearch />
                <ChatList className={classes.chatList} />
            </Drawer >
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    (true === false) ?
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
                        <Chat />
                }

            </main>
        </div >
    )
}

export default withStyles(styles)(ChatPage);

