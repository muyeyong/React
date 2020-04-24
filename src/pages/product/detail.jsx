import React, { Component } from 'react'
import {
  Card,
  Icon,
  List
} from 'antd'

import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import { RollbackOutlined } from '@ant-design/icons';

const Item = List.Item


/*
Product的详情子路由组件
 */
export default class ProductDetail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount() {

    // 得到当前订单的分类ID
    const { parentId, selfId } = memoryUtils.wo
    if (parentId === '0') { // 一级分类下的订单
      const result = await reqCategory(selfId)
      const cName1 = result.data.name
      this.setState({ cName1 })
    } else { // 二级分类下的订单
      /*
      //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
      const result1 = await reqCategory(parentId) // 获取一级分类列表
      const result2 = await reqCategory(selfId) // 获取二级分类
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      */

      // 一次性发送多个请求, 只有都成功了, 才正常处理
      const results = await Promise.all([reqCategory(parentId), reqCategory(selfId)])
      console.log(results)
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount() {
    memoryUtils.product = {}
  }


  render() {

    // 读取携带过来的state数据
    const { woId, cost, detail, imgs } = memoryUtils.wo
    const { cName1, cName2 } = this.state
    console.log(memoryUtils.wo)
    const title = (
      <span>
        <LinkButton>
          {/* <Icon
            type='arrow-left'
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          /> */}
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
            <span className="left">订单价格:</span>
            <span>{cost}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' --> ' + cName2 : ''}</span>
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