import React, { Component } from 'react';
import {Button,Table,Card,message} from 'antd';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api/index'

 class Category extends Component {

    state = {
      categorys : [],
      loading : false
    }

    initColumns = ()=>{
      this.columns = [
        {
          title: '部门',
          dataIndex: 'name',
          key: 'name',
        },
       
        {
          title: '操作',
          dataIndex: '',
          width:300,
          key: 'x',
          render: () => 
              <span>
                  <LinkButton>修改订单类别</LinkButton>
                  <LinkButton>查看订单</LinkButton>
              </span>
          ,
        },
      ];
    }

    getCategorys = async ()=>{

      this.setState({loading:true});
      const result = await reqCategorys('0');
      this.setState({loading:false});
      if(result.status === 0){

        this.setState({
          categorys:result.data
        })
      
      }else{
          message.error('获取失败');
      }

    }

    componentWillMount(){

      this.initColumns();

    }

    componentDidMount(){

      this.getCategorys();

    }

    render() {
      const {categorys,loading} = this.state;
      
         
        return (
            <Card title="订单类别" extra={<Button type='primary'>添加</Button>} >
                <Table 
                loading = {loading}
                dataSource={categorys}
                columns={this.columns} 
                rowKey="_id" 
                bordered
                  />;
            </Card>
        )
    }
}

export default Category
