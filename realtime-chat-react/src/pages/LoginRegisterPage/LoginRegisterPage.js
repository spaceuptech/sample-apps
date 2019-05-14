import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import ReactCardFlip from 'react-card-flip';
import { history } from '../../helpers';


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
        linkToFlip: {
            textAlign: 'center',
            margin: '15px',
            cursor: 'pointer'
        }
    }
};

const LoginRegisterPage = ({ classes, isRegister: flipRequired }) => {
    const [isFlipped, flip] = useState(flipRequired);

    useEffect(() => {
        history.push(isFlipped ? "register" : "login")
    }, [isFlipped])

    return (

        <Grid
            container
            className={classes.content}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item className={classes.formContainer}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div key="front">
                        <LoginForm />
                        <Typography onClick={() => flip(!!!isFlipped)} className={classes.linkToFlip}>Not member yet ?</Typography>
                    </div>

                    <div key="back">
                        <RegisterForm />
                        <Typography onClick={() => flip(!!!isFlipped)} className={classes.linkToFlip}>Already a member?</Typography>
                    </div>
                </ReactCardFlip>
            </Grid>
        </Grid>
    )
}


export default withStyles(styles)(LoginRegisterPage);

