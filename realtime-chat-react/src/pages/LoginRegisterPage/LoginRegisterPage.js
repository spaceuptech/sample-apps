import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';


const styles = theme => {
    return {
        root: {
            display: 'flex',
            alignItems: 'flex-start'
        },
        content: {
            flexGrow: 1,
            flex: 1,
            // padding: theme.spacing.unit * 3,
            width: '100%',
            height: '100vh'
        },
        formContainer: {
            background: '#FFFFFF',
            border: '1px solid #BDBDBD',
            boxSizing: 'border-box',
            borderRadius: '10px',
            padding: '50px',
            paddingBottom: '40px',
            width: '518px',
            maxWidth: '100%',
            height: '434px',
            maxHeight: '100%'
        },
    }
};

const LoginRegisterPage = (props) => {
    const { classes } = props;
    return (
        <Grid
            container
            className={classes.content}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item className={classes.formContainer}>

                <LoginForm />
                {/* <RegisterForm /> */}
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(LoginRegisterPage);

