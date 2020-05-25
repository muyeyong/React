import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
class AddForm extends Component {

  formRef = React.createRef();

  static propTypes = {
    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }

  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }

  render() {

    const { parentId } = this.props;
    return (
      <Form ref={this.formRef}>
        <Item name='categoryName'>
          <Input
            placeholder='请输入分类名称'
            rules={[{ required: true, message: '请输入分类名称!' }]} />
        </Item>
        <Item name='price'>
          {parentId === '0' ? null : <Input type='number' placeholder='请输入服务价格' addonAfter='元' />}
        </Item>
      </Form>
    )
  }
}

export default AddForm