import React, { Component } from 'react'
import './login.less';
import logo from './images/logo.png'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

 class Login extends Component {

    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log("表单检验成功")
            }else{
                console.log("表单验证失败")
            }
        })

        // const form = this.props.form;
        // const values = form.getFieldsValue();
        // console.log(values)
    }

    validatePwd = (rule,value,callback)=>{
        if(!value){
            callback('密码不能为空')
        } else if(value.length<4 || value.length>12){
            callback('密码长度不符合要求')
        } else if(!/^[0-9a-zA-Z_]+$/.test(value)){
            callback('密码只能有数字字母和下划线组成')
        }else{
            callback()
        }
    }

    render() {
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return <>
            <div className="login">
                <header className="login-header">u
                    <img src={logo} alt="logo" />
                    <h1>React：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            { getFieldDecorator('username',{rules:[
                                {required:true,message:"用户名必填"},
                                {min:4,message:"用户名不少于四位"},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:"用户名仅限于字母数字和下划线"}
                            ]})(
                            <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                          )}
                        </Form.Item>
                        <Form.Item>
                           { getFieldDecorator('password',{rules:[{
                               validator:this.validatePwd
                           }]})(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                           )}
                               
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

const WrapLogin = Form.create()(Login);
export default WrapLogin;


