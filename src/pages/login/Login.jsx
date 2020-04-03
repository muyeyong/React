import React, { Component } from 'react';
import './login.less';
import logo from '../../assets/imags/logo.png';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';




class Login extends Component {

    handleSubmit = async value => {
        const result = await reqLogin(value.username, value.password)
        if (result.status === 0) {
            message.success('登录成功')
            storageUtils.saveUser(result.data)
            memoryUtils.user = result.data
            this.props.history.push('/')

        } else {
            message.error(result.msg)
        }
    }






    render() {
        const user = memoryUtils.user || storageUtils.getUser();
        if (user && user._id) return <Redirect to='/'></Redirect>;
        return <>
            <div className="login">
                <header className="login-header">u
                    <img src={logo} alt="logo" />
                    <h1>React：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onFinish={this.handleSubmit} name="normal_login" className="login-form">
                        <Form.Item name="username" rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 4, message: '用户名最少四位' },
                            { max: 12, message: '用户名最多12位' }
                        ]}>

                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                            />

                        </Form.Item>
                        <Form.Item name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]} >

                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />


                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                         </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>

        </>
    }
}

export default Login;


