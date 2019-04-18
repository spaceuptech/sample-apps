
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import { ReactComponent as SendLogo } from '../../assets/send_icon.svg';

const styles = theme => ({
    root: {
        width: '100%',
    },
    chatStartNotice: {
        color: '#999999',
        fontSize: '16px'
    },
    grow: {
        flexGrow: 1,
        flex: 1
    },
    messageField: {
        background: '#FFFFFF',
        border: '1px solid #EEEEEE',
        boxSizing: 'border-box',
        borderRadius: '70px',
        paddingLeft: '30px',
        paddingRight: '30px',
        height: '50px',
        outline: 'none',
        width: '100%'
    }
});

const ChatSend = (props) => {
    const { classes } = props;
    return (
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" className={classes.root}>
            <Input
                type="text" 
                className={classes.messageField}
                defaultValue=""
                placeholder="Type your message..."
                disableUnderline={true}
                endAdornment={
                    <SendLogo/>
                }
            />
        </Grid>
    )
}

export default withStyles(styles)(ChatSend);
