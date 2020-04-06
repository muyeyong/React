import React, { Component } from 'react';
import { Button, Table, Card, message, Modal, Form ,Select,Input} from 'antd';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqAddCategory,reqUpdateCategory,reqCategoryInfo} from '../../api/index';
import AddForm from './add-form';
import UpdateForm from './update-form';
import {ArrowRightOutlined} from '@ant-design/icons';

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
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看订单</LinkButton> : null}
          </span>
        ,
      },
    ];

    this.columnsWo = [
      {
        title: '单号',
        dataIndex: 'woId',
        key: 'woId',
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '截至时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '费用',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '下一步操作',
        dataIndex: '',
        width: 300,
        key: 'x',
        render: (category) =>
        <>
          <span>
            <LinkButton >接受订单</LinkButton>
            <LinkButton >拒绝订单</LinkButton> 
          </span>
          <LinkButton >订单完成</LinkButton> 
          </>
        ,
      },
    ]
  }


  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  showSubCategorys = (category) => {
    console.log(category)
    // 更新状态
    // this.setState({
    //   parentId: category._id,
    //   parentName: category.name
    // }, () => { 
    //   this.getCategorys()
    // })

  }


  getCategorys = async (parentId) => {
    this.setState({ loading: true });
     parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      if(parentId === '0'){
        this.setState({
          categorys: result.data
        })
      }else{
        this.setState({
          subCategorys: result.data
        })
      }
    } else {
      message.error('获取失败');
    }
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.setState({showStatus:0});
  }

  addCategory = () => {
    const {parentId} = this.state;
     this.form.validateFields().then( async values =>{
      this.setState({
        showStatus: 0
      })
        const {categoryName} = values;
        this.form.resetFields()
        const result = await reqAddCategory(categoryName ,parentId);
        if(result.status === 0){
          this.getCategorys();
        }
        else{
          message.error('出了点问题，请稍后再试');
        }
     }).catch(error=>{
        message.error('出了点问题，请稍后再试');
     })
   
  }


  updateCategory = () => {
     this.form.validateFields().then(async values=>{
        this.setState({showStatus:0});
        const categoryId = this.category._id
        const {categoryName} = values;
        this.form.resetFields()
        const result = await reqUpdateCategory({categoryId, categoryName})
        if (result.status===0) {
          this.getCategorys()
        }
     }).catch(error=>{
         message.error('出了点问题，请稍后再试');
     })

  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }


  handleAddCategory = ()=>{
     this.addCategory();
  }


  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getCategorys();
  }


  render() {
    const { categorys, loading, parentId, parentName, subCategorys, showStatus } = this.state;
    const category = this.category || {};
    const title = parentId === '0'? '订单类别':(
      <span>
      <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
      <ArrowRightOutlined style={{marginRight: 5}} />
      <span>{parentName}</span>
    </span>
    )
    return (
      <Card title={title} extra={<Button type='primary' onClick={this.showAdd}>添加</Button>} >
        <Table
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={parentId==='0'? this.columns:this.columnsWo}
          rowKey="_id"
          bordered
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />

      

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
       

        <Modal
          title="更新部门"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {this.form = form}}
          />
        </Modal>

      </Card>
    )
  }
}

export default Category
