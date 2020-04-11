import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加/修改用户的form组件
 */
class UserForm extends PureComponent {

  formRef = React.createRef()

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }

  render() {

    const { roles, user } = this.props
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form
        ref={this.formRef}
        initialValues={{
          username: user.username,
          phone: user.phone,
          email: user.email,
          role_id: user.role_id
        }}
        {...formItemLayout}
      >
        <Item label='用户名' name='username' rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名最少3位' },
          { max: 12, message: '用户名最多12位' }]
        }>
          <Input placeholder='请输入用户名' />
        </Item>
        {
          user._id ? null : (<>
            <Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Item>

            <Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '密码输入不一致!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Item></>
          )
        }


        <Item label='手机号' name='phone' rules={[{ required: true, message: '请输入手机号' }]} hasFeedback>

          <Input placeholder='请输入手机号' />

        </Item>
        <Item
          label='邮箱'
          name='email'
          rules={[
            {
              type: 'email',
              message: '请输入合法的邮箱',
            },
            {
              required: true,
              message: '邮箱不能缺少',
            },
          ]}>

          <Input placeholder='请输入邮箱' />

        </Item>

        <Item label='角色' name='role_id' rules={[{
          required: true, message: '请选择角色类型'
        }]}
        >

          <Select>
            {
              roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
            }
          </Select>

        </Item>
      </Form>
    )
  }
}

export default UserForm