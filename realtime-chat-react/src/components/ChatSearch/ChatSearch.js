import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    input: {
        background: '#FFFFFF',
        borderBottom: '1px solid #EEEEEE',
        boxSizing: 'border-box',
        width: '100%',
        padding: '5px',
        paddingLeft: '10px',
        height: '67px'
    },
    inputIcon: {
        marginRight: '15px',
        width:'24px',
        color: '#BDBDBD'
    },
});


const ChatSearch = ({ classes }) => {
    return (
        <Input
        type="text"
        className={classes.input}
        defaultValue=""
        placeholder="Search Conversation"
        disableUnderline={true}
        startAdornment={
            <SearchIcon className={classes.inputIcon} />
        }
    />
    )
}

export default withStyles(styles)(ChatSearch);
