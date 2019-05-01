import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailIcon from '@material-ui/icons/Mail';
import { ReactComponent as OutlinedLogo } from '../../assets/outlined_logo.svg';
import { Typography, Grid, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { UserActions } from '../../actions/user.actions';
import { connect } from 'react-redux';


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

const RegisterForm = (props) => {
    const { classes, signup } = props;
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [canSubmit, setCanSubmit] = useState(false)

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateForm = () => {
        if (user.length > 0 && password.length > 0 && email.length > 0) {
            // return validateEmail(email)
            return true
        }
        return false
    }

    useEffect(() => {
        setCanSubmit(validateForm())
    }, [user, password, email])


    const handleSignup = () => {
        if (props.signup && (canSubmit === true)) {
            props.signup(email, user, password)
        }
    }

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            handleSignup();
        }
    }

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
                <Typography className={classes.welcomeText}>Create your Account</Typography>
            </Grid>
            <Grid item>
                <Input
                    type="text"
                    className={classes.input}
                    defaultValue=""
                    placeholder="Name"
                    disableUnderline={true}
                    startAdornment={
                        <PermIdentityIcon className={classes.inputIcon} />
                    }
                    onChange={(event) => setUser(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Grid>
            <Grid item>
                <Input
                    type="text"
                    className={classes.input}
                    defaultValue=""
                    placeholder="Email"
                    disableUnderline={true}
                    startAdornment={
                        <MailIcon className={classes.inputIcon} />
                    }
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={handleKeyDown}
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
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={!canSubmit}
                    onClick={() => handleSignup()}>
                    Sign up
                    </Button>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    signup: (email, user, pass) => dispatch(UserActions.signup(email, user, pass))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegisterForm));

