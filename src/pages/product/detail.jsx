import React, { Component } from 'react'
import {
  Card,
  List
} from 'antd'

import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import {  reqWo } from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import woUtils from '../../utils/woUtils';
import { RollbackOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

const Item = List.Item


/*
Product的详情子路由组件
 */
class ProductDetail extends Component {

  state = {
    wo: {}
  }

  async componentWillMount() {

    // if (!memoryUtils.wo.woId) {
    //   let history = woUtils.getStoreHistory();
    //   if (history._id) {
    //     let result = await reqWo(history._id);
    //     if (result.status === 0) {
    //       this.setState({ wo: result.data });
    //     }
    //   }
    // } else {
    //   woUtils.setStoreHistory({ _id: memoryUtils.wo._id })
    //   this.setState({ wo: memoryUtils.wo })
    // }

  }

  async componentDidMount() {

    if (!memoryUtils.wo.woId) {
      let history = woUtils.getStoreHistory();
      if (history._id) {
        let result = await reqWo(history._id);
        if (result.status === 0) {
          this.setState({ wo: result.data });
        }
      }
    } else {
      woUtils.setStoreHistory({ _id: memoryUtils.wo._id })
      this.setState({ wo: memoryUtils.wo })
    }


    // const { parentId, selfId } = memoryUtils.wo
    // if (parentId === '0') { // 一级分类下的订单
    //   const result = await reqCategory(selfId)
    //   const cName1 = result.data.name
    //   this.setState({ cName1 })
    // } else { // 二级分类下的订单
    //   /*
    //   //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
    //   const result1 = await reqCategory(parentId) // 获取一级分类列表
    //   const result2 = await reqCategory(selfId) // 获取二级分类
    //   const cName1 = result1.data.name
    //   const cName2 = result2.data.name
    //   */

    //   // 一次性发送多个请求, 只有都成功了, 才正常处理
    //   const results = await Promise.all([reqCategory(parentId), reqCategory(selfId)])
    //   const cName1 = results[0].data ? results[0].data.name : ''
    //   const cName2 = results[1].data ? results[1].data.name : ''
    //   this.setState({
    //     cName1,
    //     cName2
    //   })
    // }

  }

  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount() {
    memoryUtils.product = {}
  }


  render() {

    // 读取携带过来的state数据
    const { woId, cost, detail, imgs, serviceName } = this.state.wo
    const title = (
      <span>
        <LinkButton>
          <RollbackOutlined
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>

        <span>订单详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">订单号:</span>
            <span>{woId}</span>
          </Item>
          <Item>
            <span className="left">客户姓名</span>
            <span>{this.props.user.username}</span>
          </Item>
          <Item>
            <span className="left">联系方式</span>
            <span>{this.props.user.phone}</span>
          </Item>
          <Item>
            <span className="left">订单价格:</span>
            <span>{cost}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{serviceName}</span>
          </Item>
          <Item>
            <span className="left">订单图片:</span>
            <span>
              {
                imgs && imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">订单详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}

export default connect(
  state => ({ user: state.user })
)(ProductDetail)