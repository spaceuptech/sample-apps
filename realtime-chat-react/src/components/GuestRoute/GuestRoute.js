import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'


const GuestRoute = ({ component: Component, isLoggedIn, isRegister, ...rest }) => (

    <Route {...rest} render={(props) => (

        (!!!isLoggedIn)
            ? <Component {...props} isRegister={isRegister}/>
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />

    )} />
) 

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.authenticated
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestRoute);
