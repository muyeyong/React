import React, { Component } from 'react';
import './login.less';
import logo from '../../assets/imags/logo.png';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getUserAuth } from '../../redux/actions';


class Login extends Component {

    handleSubmit = async value => {
        this.props.login(value.username, value.password);

    }



    render() {
        const user = this.props.user;
        if (user && user._id) return <Redirect to='/'></Redirect>;
        return <>
            <div className="login">
                <header className="login-header">
                    <h1>家政服务平台</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onFinish={this.handleSubmit} name="normal_login" className="login-form">
                        <Form.Item name="username" rules={[
                            { required: true, message: 'Please input your Username!' },
                            { min: 3, message: '用户名最少3位' },
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

export default connect(
    state => ({ user: state.user }),
    { login, getUserAuth }
)(Login)


