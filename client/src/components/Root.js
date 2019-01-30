import React, {Component} from 'react';

import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import Async from './Misc/Async';
import Guard from './Misc/Guard';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* ========== Admin =========== */}
                    <Route path={'/admin'} exact component={Guard(Async('Admin'), {redirectFailed: '/auth'})} />

                    {/* ========== User =========== */}
                    <Route path={'/'} exact component={Guard(Async('Panel'), {redirectFailed: '/auth'})} />

                    {/* ========== Auth =========== */}
                    <Route path={'/auth'} exact component={Guard(Async('Auth'), {redirectSuccess: '/'})}/>
                    <Route path={`/auth/register`} exact component={Guard(Async('Auth/Register'), {redirectSuccess: '/'})}/>
                    <Route path={`/auth/reset`} exact component={Guard(Async('Auth/Reset'), {redirectSuccess: '/'})}/>

                    {/* ========== Other =========== */}
                    <Route path={`*`} component={Async('Misc/NotFound')}/>
                </Switch>
            </Router>
        );
    }
}