import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailIcon from '@material-ui/icons/Mail';
import { ReactComponent as OutlinedLogo } from '../../assets/outlined_logo.svg';
import { Typography, Grid, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const styles = theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'flex-start'
        },
        content: {
            flexGrow: 1,
            flex: 1,
            width: '100%',
            height: '100vh'
        },
        welcomeText: {
            fontSize: '20px',
            marginBottom: '10px',
            textAlign: 'center'
        },
        input: {
            background: '#FFFFFF',
            border: '1px solid #BDBDBD',
            boxSizing: 'border-box',
            borderRadius: '4px',
            width: '100%',
            padding: '5px'
        },
        inputIcon: {
            marginRight: '5px',
            color: 'rgba(20, 20, 20, 0.64)'
        },
        submitButton: {
            width: '100%',
            marginTop: '10px',
        },
        logoContainer: {
            textAlign: "center",
        }
    }
};

const LoginForm = (props) => {
    const { classes } = props;
    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="stretch"
            spacing={8}
        >
            <Grid item className={classes.logoContainer}>
                <OutlinedLogo />
            </Grid>
            <Grid item>
                <Typography className={classes.welcomeText}>Continue to Chat Room</Typography>
            </Grid>
            <Grid item>
                <Input
                    type="text"
                    className={classes.input}
                    defaultValue=""
                    placeholder="Email"
                    disableUnderline={true}
                    startAdornment={
                        <MailIcon className={classes.inputIcon}/>
                    }
                />
            </Grid>
            <Grid item>
                <Input
                    type="text"
                    className={classes.input}
                    defaultValue=""
                    placeholder="Password"
                    disableUnderline={true}
                    startAdornment={
                        <LockIcon className={classes.inputIcon} />
                    }
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" className={classes.submitButton}>
                    Login 
                        </Button>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(LoginForm);

