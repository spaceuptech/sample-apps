import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Update this for debug purpose
// TODO: move this to appropriate reducer
const isLoggedIn = true;

export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (

        (isLoggedIn)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

    )} />
)