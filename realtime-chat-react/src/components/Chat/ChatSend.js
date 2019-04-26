
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import { ReactComponent as SendLogo } from '../../assets/send_icon.svg';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        width: '100%',
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
    },
    sendButton: {
        cursor: 'pointer'
    }
});

const ChatSend = (props) => {
    const { classes } = props;
    const [messageText, setMessageText] = useState("")

    const handleSend = () => {
        if (props.onSubmit) {
            props.onSubmit(messageText)            
            setMessageText("")
        }
    }
    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleSend();
        }
    }
    return (
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" className={classes.root}>
            <Input
                type="text"
                className={classes.messageField}
                value={messageText}
                placeholder="Type your message..."
                disableUnderline={true}
                onChange={evt => setMessageText(evt.target.value)}
                endAdornment={
                    <IconButton color="primary" component="span" onClick={handleSend}  disabled={!messageText.length > 0}>
                        <SendLogo />
                    </IconButton>
                }
                onKeyDown={handleKeyDown}
            />
        </Grid>
    )
}

export default withStyles(styles)(ChatSend);
