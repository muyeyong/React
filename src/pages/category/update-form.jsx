import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
更新分类的form组件
 */
class UpdateForm extends Component {

  formRef = React.createRef();

  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }


  render() {

    const {categoryName,parentId} = this.props
    
    return (
      <>
      <Form ref={this.formRef}>
        <Item name='categoryName'>
        <Input 
              placeholder='请输入分类名称' 
              rules={[{ required: true, message: '请输入分类名称!' }]}/>
        </Item>
        <Item name='price'>
         {parentId === '0'? null:  <Input type='number'  placeholder='请输入服务价格' addonAfter='元'/> }
         </Item>
      </Form>
      </>
    )
  }
}

export default UpdateForm