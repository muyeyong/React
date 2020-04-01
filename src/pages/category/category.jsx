import React, { Component } from 'react';
import {Button,Table,Card} from 'antd';
import LinkButton from '../../components/link-button';

 class Category extends Component {
    render() {
        //const extra = ()
        const dataSource = [
            {
                "parentId": "0",
                "_id": "5c2ed631f352726338607046",
                "name": "分类001",
                "__v": 0
              },
              {
                "parentId": "0",
                "_id": "5c2ed647f352726338607047",
                "name": "分类2",
                "__v": 0
              },
              {
                "parentId": "0",
                "_id": "5c2ed64cf352726338607048",
                "name": "1分类3",
                "__v": 0
              }
          ];
          
          const columns = [
            {
              title: '部门',
              dataIndex: 'name',
              key: 'name',
            },
           
            {
              title: '操作',
              dataIndex: '',
              key: 'x',
              render: () => 
                  <span>
                      <LinkButton>修改订单类别</LinkButton>
                      <LinkButton>查看订单</LinkButton>
                  </span>
              ,
            },
          ];
        return (
            <Card title="订单类别" extra={<Button type='primary'>添加</Button>} >
                <Table 
                dataSource={dataSource}
                columns={columns} 
                rowKey="_id" 
                bordered
                  />;
            </Card>
        )
    }
}

export default Category
