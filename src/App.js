import React, { Component } from 'react'
import { Button, message } from 'antd'
import { BrowserRouter, Route ,Switch} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

export default class App extends Component {
    handleClick = () => {
        message.success('啊哈哈哈哈')
    }
    render() {
        return <>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' >
                        <Login />
                    </Route>
                    <Route path='/' >
                        <Admin />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    }
}