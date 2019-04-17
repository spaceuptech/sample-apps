import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NearMeIcon from '@material-ui/icons/NearMe';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1,
        textAlign: 'center'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

const NavBar = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <NearMeIcon />
                        WhatsApp Clone
                 </Typography>
                    <Button color="inherit"><ExitToAppIcon />Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(NavBar);
