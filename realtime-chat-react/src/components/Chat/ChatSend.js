
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import { ReactComponent as SendLogo } from '../../assets/send_icon.svg';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames'


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
    },
    buttonEnabled: {
        fill: theme.palette.primary.main
    },
    buttonDisabled: {
        fill: '#d3d3d3'
    }
});

const ChatSend = (props) => {
    const { classes } = props;
    const [messageText, setMessageText] = useState("")
    const [canSend, setCanSend] = useState(false)

    const handleTextChange = (value)=>{
        setMessageText(value)
        setCanSend(value.length > 0)
    }

    const handleSend = () => {
        if (props.onSubmit && (canSend === true)) {
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
                onChange={evt => handleTextChange(evt.target.value)}
                endAdornment={
                    <IconButton color="primary" component="span" onClick={handleSend}  disabled={!messageText.length > 0}>
                        <SendLogo className={classnames({[classes.buttonDisabled]:!canSend},{[classes.buttonEnabled]:canSend})}/>
                    </IconButton>
                }
                onKeyDown={handleKeyDown}
            />
        </Grid>
    )
}

export default withStyles(styles)(ChatSend);
