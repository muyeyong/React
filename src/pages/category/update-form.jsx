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
    setForm: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }


  render() {

    const {categoryName} = this.props
    
    return (
      <>
      {console.log(categoryName)}
      <Form ref={this.formRef}>
        <Item name='categoryName'>
        <Input 
              placeholder='请输入部门名称' 
              rules={[{ required: true, message: '请输入部门名称!' }]}/>
        </Item>
      </Form>
      </>
    )
  }
}

export default UpdateForm