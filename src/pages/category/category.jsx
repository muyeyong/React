import React, { Component } from 'react';
import { Button, Table, Card, message, Modal, Form ,Select,Input} from 'antd';
import LinkButton from '../../components/link-button';
import { reqCategorys, addCategory } from '../../api/index';
import AddForm from './add-form'
import UpdateForm from './update-form';

const Item = Form.Item
const Option = Select.Option

class Category extends Component {

  formRef = React.createRef();

  state = {
    categorys: [],
    loading: false,
    subCategorys: [],
    parentId: '0',
    parentName: '',
    showStatus: 0
  }

  initColumns = () => {
    this.columns = [
      {
        title: '部门',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width: 300,
        key: 'x',
        render: (category) =>
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改订单类别</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.getSubCategorys(category)}>查看订单</LinkButton> : null}
          </span>
        ,
      },
    ];
  }


  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }

  showSubCategorys = (category) => {
    // 更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在状态更新且重新render()后执行
      console.log('parentId', this.state.parentId) // '0'
      // 获取二级分类列表显示
      this.getCategorys()
    })

    // setState()不能立即获取最新的状态: 因为setState()是异步更新状态的
    // console.log('parentId', this.state.parentId) // '0'
  }


  getCategorys = async () => {
    this.setState({ loading: true });
    const result = await reqCategorys('0');
    this.setState({ loading: false });
    if (result.status === 0) {

      this.setState({
        categorys: result.data
      })

    } else {
      message.error('获取失败');
    }
  }

  handleOk = () => {

  }

  handleCancel = () => {

  }

  addCategory = () => {
     
    console.log(this.form)
    this.form.validateFields( (err, values) => {
      this.setState({
        showStatus: 0
      })
      if (!err) {
        // 隐藏确认框
       

       
      }
    })

  }


  updateCategory = () => {


  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }


  handleAddCategory = ()=>{
     this.addCategory();
  }


  componentWillMount() {

    this.initColumns();

  }


  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const { categorys, loading, parentId, parentName, subCategorys, showStatus } = this.state;
    const category = this.category || {}
    return (
      <Card title="订单类别" extra={<Button type='primary' onClick={this.showAdd}>添加</Button>} >
        <Table
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          rowKey="_id"
          bordered
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />;

      

          <Modal
            title="添加部门"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >

         <AddForm  setForm={(form) => {this.form = form}}  categorys={categorys} parentId={parentId} /> 
            {/* <Form onFinish= {}>
              <Item
                name="category"
                rules={[{ required: true, message: '请输入部门名称' }]}
              >
                <Input placeholder='请输入部门名称' />
              </Item>
            </Form> */}
          </Modal>
       

        {/* <Modal
          title="更新部门"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {this.form = form}}
          />
        </Modal> */}

      </Card>
    )
  }
}

export default Category
