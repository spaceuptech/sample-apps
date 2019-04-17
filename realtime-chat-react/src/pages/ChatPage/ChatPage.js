import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ChatList, NavBar } from '../../components'
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
            padding: theme.spacing.unit * 3,
            width: '100%'
        },
        toolbar: theme.mixins.toolbar,
        snippetText: {
            paddingBottom: theme.spacing.unit * 5,
            paddingTop: theme.spacing.unit * 5,
            fontSize: '24px'
        },
        spanText: {
            color: '#BDBDBD'
        }
    }
};

const ChatPage = ({ classes }) => {

    return (
        <div className={classes.root}>
            <NavBar />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <ChatList />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
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

            </main>
        </div >
    )
}

export default withStyles(styles)(ChatPage);

