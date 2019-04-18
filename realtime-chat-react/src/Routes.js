import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { ChatPage } from './pages';
import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage';
import { PrivateRoute } from './components';
import { history } from "./helpers"

const Handler404 = () => {
    return (<div><Redirect to='/'></Redirect></div>)
}
export default () => {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={ChatPage} />
                <Route path="/login" render={(props) => <LoginRegisterPage {...props} isRegister={false} />}/>
                <Route path="/register" render={(props) => <LoginRegisterPage {...props} isRegister={true} />}/>
                <Route path='*' exact component={Handler404} />
            </Switch>
        </Router>
    )
}