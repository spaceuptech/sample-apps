import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { ChatPage } from './pages';
import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage';
import { PrivateRoute } from './components';
import { history } from "./helpers"
import GuestRoute from './components/GuestRoute/GuestRoute';

const Handler404 = () => {
    return (<div><Redirect to='/'></Redirect></div>)
}
export default () => {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={ChatPage} />
                <GuestRoute path="/login" component={LoginRegisterPage} isRegister={false} />
                <GuestRoute path="/register" component={LoginRegisterPage}  isRegister={true} render={(props) => <LoginRegisterPage {...props} isRegister={true} />}/>
                <Route path='*' exact component={Handler404} />
            </Switch>
        </Router>
    )
}