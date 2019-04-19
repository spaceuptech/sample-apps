import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ChatMessage from './ChatMessage';


const styles = theme => ({
    root: {
        width: '100%',
        flex:1,
        background: '#F5F5F5',

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

const ChatDiscussion = (props) => {
    const { classes } = props;
    return (
            <Grid container justify="flex-start" alignItems="center" direction="column" className={classes.root}>
                <Typography className={classes.chatStartNotice}>This is the very beginning of your chat with John Doe.</Typography>
                <ChatMessage messageText="Hello world !" incoming={true} />
                <ChatMessage messageText="Halo world !" incoming={false} />

            </Grid>
    )
}

export default withStyles(styles)(ChatDiscussion);
