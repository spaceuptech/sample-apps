import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ChatMessage from './ChatMessage';
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: '100%',
        background: '#F5F5F5',
    },
    chatStartNotice: {
        color: '#999999',
        fontSize: '16px'
    }
});

const ChatDiscussion = (props) => {
    const { classes, className } = props;
    return (
        <Grid container justify="flex-start" alignItems="center" direction="column" className={classNames(classes.root, className)}>
            <Typography className={classes.chatStartNotice}>This is the very beginning of your chat with John Doe.</Typography>
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />
            <ChatMessage messageText="Halo world !" incoming={false} />
            <ChatMessage messageText="Hello world !" incoming={true} />

        </Grid>
    )
}

export default withStyles(styles)(ChatDiscussion);
