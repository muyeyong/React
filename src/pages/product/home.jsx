import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import { reqSearchWos, reqAllWo, reqDelectWo, reqUpdateWoStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";
import statusUtils from '../../utils/statusUtils'
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LinkButton from '../../components/link-button'

const Option = Select.Option

class ProductHome extends Component {

  state = {
    total: 0, // 商品的总数量
    wos: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'woId', // 根据哪个字段搜索
  }

  /*
  初始化table的列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '单号',
        dataIndex: 'woId',
        render: (woId, wo) => <LinkButton onClick={() => this.showDetail(wo)}>{woId}</LinkButton>

      },
      {
        title: '服务地址',
        dataIndex: 'address'
      },
      {
        title: '服务内容',
        dataIndex: 'serviceName'
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
        render: (cost) => '¥' + cost
      },
      {
        width: 200,
        title: '订单状态',
        render: (wo) => {
          const { status } = wo
          return (
            <span>
              <span>{statusUtils.getWoStatus(status)}</span>
            </span>
          )
        }
      },

    ];
    if (this.props.userAuth) {
      this.columns.push({
        width: 300,
        title: '操作',
        render: (wo) => {
          return (
            <span>
              {this.getNextOption(wo)}
            </span>
          )
        }
      })
    }
  }


  getNextOption = (wo) => {
    switch (wo.status) {
      case 0: return <><Button type="primary" onClick={() => this.changeWoStatus(wo, 2)}>拒绝订单</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={() => this.changeWoStatus(wo, 1)} type="primary">接收订单</Button></>
      case 1: return <Button type="primary" onClick={() => this.changeWoStatus(wo, 3)}>进行订单服务</Button>
      case 3: return <Button type="primary" onClick={() => this.changeWoStatus(wo, 4)}>完成订单服务</Button>
      default: return <Button type="primary" disabled>订单已完成</Button>
    }
  }

  changeWoStatus = async (wo, nextStatus) => {
    if (nextStatus === 2) {
      let result = await reqDelectWo(wo._id);
      if (result.status === 0) {
        message.success('订单已经被拒绝')
        this.getWos(1)
      }
    } else {
      let result = await reqUpdateWoStatus(wo._id, nextStatus);
      if (result.status === 0) {
        message.success('订单状态更新成功');
        this.getWos(1)
      } else {
        message.error(result.msg);
      }
    }
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
  getWos = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({ loading: true }) // 显示loading

    const { searchName, searchType } = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchWos({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else { // 一般分页请求
      result = await reqAllWo(pageNum, PAGE_SIZE, this.props.user._id)
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



  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {

    this.getWos(1)
  }

  render() {

    const { wos, total, loading, searchType, searchName } = this.state



    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value='woId'>按单号搜索</Option>
          <Option value='woDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => this.getWos(1)}>搜索</Button>
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
            onChange: this.getWos
          }}
        />
      </Card>
    )
  }
}

export default connect(
  state => ({ user: state.user, userAuth: state.userAuth })
)(ProductHome);