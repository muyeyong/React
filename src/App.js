import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

export default class App extends Component {


    handleClick = () => {
    }
    render() {
        return <>
            <Router >
                <Switch>
                    <Route path='/login' component={Login}>
                    </Route>
                    <Route path='/' component={Admin}>
                    </Route>
                </Switch>
            </Router>
        </>
    }
}