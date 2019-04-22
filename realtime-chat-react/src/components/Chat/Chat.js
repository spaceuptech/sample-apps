import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChatHeader from './ChatHeader';
import ChatDiscussion from './ChatDiscussion';
import ChatSend from './ChatSend';

const styles = theme => ({
    chat: {
        width: '100%',
        background: '#F5F5F5',
        backgroundColor: theme.palette.background.paper,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            minHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
            maxHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
            maxHeight: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
        },
        display: 'flex',
        flexFlow: 'column'
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
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ChatHeader />
            <Grid className={classes.chat}>
                <Grid container direction="column"
                    alignItems="baseline"
                    style={{ overflow: 'auto' }}>
                    <ChatDiscussion />
                </Grid>
                <ChatSend item className={classes.sendBox} />
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Chat);
