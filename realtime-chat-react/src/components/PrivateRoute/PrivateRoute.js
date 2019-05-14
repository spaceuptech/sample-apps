import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'


const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (

    <Route {...rest} render={(props) => (

        (isLoggedIn)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

    )} />
) 

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.authenticated
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
