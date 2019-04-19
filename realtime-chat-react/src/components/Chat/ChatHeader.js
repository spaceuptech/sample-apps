import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: '62px'
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
    grow: {
        flexGrow: 1,
        flex: 1
    }
});

const ChatHeader = (props) => {
    const { classes } = props;
    return (
        <Grid container justify="flex-start" alignItems="center" direction="row" >
            <Grid item>
                <Avatar className={classes.avatar}>J</Avatar>
            </Grid>
            <Grid item>
                <Grid container justify="flex-start" alignItems="flex-start" direction="column">
                    <Typography className={classes.chatPartnerName}>John Doe <span className={classes.activeDot}></span></Typography>
                    <Typography>Active now</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(ChatHeader);
