import React, {Component} from 'react';

import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import Async from './Misc/Async';
import Guard from './Misc/Guard';

const AuthRoute = ({path, component, exact = false}) => <Route path={path} exact={exact} component={Guard(Async(component), {redirectFailed: '/auth'})} />;

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* ========== Admin =========== */}
                    <AuthRoute path={'/admin'} exact component={'Admin'} />
                    <AuthRoute path={'/admin/users'} component={'Admin/Users'} />

                    {/* ========== User =========== */}
                    <AuthRoute path={'/'} exact component={'Panel'} />
                    <AuthRoute path={'/user/settings'} component={'User'}/>

                    {/* ========== Auth =========== */}
                    <Route path={'/auth'} exact component={Guard(Async('Auth'), {redirectSuccess: '/'})}/>
                    <Route path={`/auth/register`} exact component={Guard(Async('Auth/Register'), {redirectSuccess: '/'})}/>
                    <Route path={`/auth/reset`} exact component={Guard(Async('Auth/Reset'), {redirectSuccess: '/'})}/>
                    <Route path={'/auth/confirm'} exact component={Async('Auth/Confirm')} />

                    {/* ========== Other =========== */}
                    <Route path={`*`} component={Async('Misc/NotFound')}/>
                </Switch>
            </Router>
        );
    }
}