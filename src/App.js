import React, { Component } from 'react'
import { Button, message } from 'antd'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';

export default class App extends Component {
    handleClick = () => {
    }
    render() {
        return <>
            <Router >
                <Route path='/login' component={Login}>
                </Route>
                <Route path='/' component={Admin}>
                </Route>
            </Router>
        </>
    }
}