import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChatHeader from './ChatHeader';
import ChatDiscussion from './ChatDiscussion';
import ChatSend from './ChatSend';


const styles = theme => ({
    root: {
        width: '100%',
        background: '#F5F5F5',
        backgroundColor: theme.palette.background.paper,
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
        },
        [theme.breakpoints.up('sm')]: {
            height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
        },
        paddingBottom: '10px',
        paddingTop: '5px'
    },
    avatar: {
        margin: 10,
        background: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
    activeDot: {
        width: '8px',
        height: '8px',
        display: 'inline-block',
        background: '#51DB98',
        borderRadius: '900px',
        border: '1px solid #51DB98',
    },
    chatPartnerName: {
        fontFamily: 'Proxima Nova',
        fontSize: '20px',
        lineHeight: 'normal',
        color: '#000000'
    },
    chatStartNotice: {
        color: '#999999',
        fontSize: '16px'
    },
    grow: {
        flexGrow: 1,
        flex: 1
    }
});

const Chat = (props) => {
    const { classes } = props;
    return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch"
            className={classes.root}
            spacing={0}
        >
            <ChatHeader item />
            <ChatDiscussion item className={classes.root} />
            <ChatSend item />
        </Grid>
    )
}

export default withStyles(styles)(Chat);
