import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ChatMessage from './ChatMessage';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
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
        // boxSizing: 'border-box',
    },
    chatPartnerName: {
        fontFamily: 'Proxima Nova',
        fontSize: '20px',
        lineHeight: 'normal',
        color: '#000000'
    }
});

const Chat = (props) => {
    const { classes } = props;
    return (
        <div>
            <Grid container justify="flex-start" alignItems="center" direction="row">
                <Grid item>
                    <Avatar className={classes.avatar}>H</Avatar>
                </Grid>
                <Grid item>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="column">
                        <Typography className={classes.chatPartnerName}>John Doe <span className={classes.activeDot}></span></Typography>
                        <Typography>Active now</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container justify="flex-start" alignItems="center" direction="column">

                    <ChatMessage messageText="Hello world !" incoming={true} />
                    <ChatMessage messageText="Halo world !" incoming={false} />

                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Chat);
