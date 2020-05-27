import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import { reqUpdateWoStatus, reqServiceWos, reqSearchServiceWos } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from "../../utils/memoryUtils";
import statusUtils from '../../utils/statusUtils'
import moment from 'moment';
import { connect } from 'react-redux';
import LinkButton from '../../components/link-button'

const Option = Select.Option

class serviceSquare extends Component {

  state = {
    total: 0, // wo的总数量
    wos: [], // wo的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'address', // 根据哪个字段搜索
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
        title: '订单价格',
        dataIndex: 'cost',
        render: (cost) => '¥' + cost
      },
      {
        width: 300,
        title: '操作',
        render: (wo) => {
          return (
            <span>
              {this.getNextOption(wo)}
            </span>
          )
        }
      }
    ];
  }


  getNextOption = (wo) => {
    return <Button type="primary" onClick={() => this.changeWoStatus(wo, 3)}>接单</Button>
  }

  changeWoStatus = async (wo, nextStatus) => {
    let result = await reqUpdateWoStatus(wo._id, nextStatus, this.props.user._id);
    if (result.status === 0) {
      message.success('接单成功');
      this.getServiceWos(1);
    } else {
      message.error(result.msg);
    }
  }

  /*
显示wo详情界面
  */
  showDetail = (wo) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.wo = wo
    this.props.history.push('/product/detail')
  }


  // 显示修改wo界面

  showUpdate = (wo) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.wo = wo
    this.props.history.push('/product/addupdate')
  }

  /*
  获取指定页码的列表数据显示
   */
  getServiceWos = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({ loading: true }) // 显示loading

    const { searchName, searchType } = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchServiceWos({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else { // 一般分页请求
      result = await reqServiceWos(pageNum, PAGE_SIZE, this.props.user._id)
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

    this.getServiceWos(1)
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
          <Option value='address'>按服务地址搜索</Option>
          <Option value='serviceName'>按服务类型搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => this.getServiceWos(1)}>搜索</Button>
      </span>
    )



    return (
      <Card title={title}>
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
            onChange: this.getServiceWos
          }}
        />
      </Card>
    )
  }
}

export default connect(
  state => ({ user: state.user, userAuth: state.userAuth })
)(serviceSquare);