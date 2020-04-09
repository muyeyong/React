import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqSearchProducts, reqUpdateStatus, reqAllWo } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";
import statusUtils from '../../utils/statusUtils'
import moment from 'moment';
const Option = Select.Option

/*
Product的默认子路由组件
 */
export default class ProductHome extends Component {

  state = {
    total: 0, // 商品的总数量
    wos: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
  }

  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '单号',
        dataIndex: 'woId',
      },
      {
        title: '服务地址',
        dataIndex: 'address'
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        render: (createDate) => moment(createDate).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '截至时间',
        dataIndex: 'deadline',
        render: (deadline) => moment(deadline).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '费用',
        dataIndex: 'cost',
        render: (cost) => '¥' + cost  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '订单状态',
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status % 5 + 1
          return (
            <span>
              {/* <Button
                type='primary'
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status===1 ? '下架' : '上架'}
              </Button> */}
              <span>{statusUtils.getWoStatus(status)}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (wo) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.showDetail(wo)}>详情</LinkButton>
              <LinkButton onClick={() => this.showUpdate(wo)}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  /*
  显示商品详情界面
    */
  showDetail = (wo) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.wo = wo
    this.props.history.push('/product/detail')
  }


  // 显示修改商品界面

  showUpdate = (wo) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.wo = wo
    this.props.history.push('/product/addupdate')
  }

  /*
  获取指定页码的列表数据显示
   */
  getAllWo = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({ loading: true }) // 显示loading

    const { searchName, searchType } = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else { // 一般分页请求
      result = await reqAllWo(pageNum, PAGE_SIZE, memoryUtils.user._id)
    }

    this.setState({ loading: false }) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据, 更新状态, 显示分页列表
      const { total, list } = result.data
      this.setState({
        total,
        wos: list
      })
    }
  }

  /*
  更新指定商品的状态
   */
  // updateStatus = async (productId, status) => {
  //   const result = await reqUpdateStatus(productId, status)
  //   if(result.status===0) {
  //     message.success('更新商品成功')
  //     this.getProducts(this.pageNum)
  //   }
  // }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getAllWo(1)
  }

  render() {

    // 取出状态数据
    const { wos, total, loading, searchType, searchName } = this.state



    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        申请服务
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={wos}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}