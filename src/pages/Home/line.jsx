import React from "react"
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts"
import DataSet from "@antv/data-set"
import { reqWoMonthData } from '../../api';
import { connect } from 'react-redux';

class Line extends React.Component {
  state = {
    woMonthData: [],
    xData: [],
  }

  getData = async () => {
    let result = await reqWoMonthData(this.props.user.role_id, this.props.user._id);
    if (result.status === 0) {
      let woMonthData = result.data;
      let xData = this.createXData(woMonthData);
      let monthData = this.initMonthData(xData);
      let data = this.updateMonthData(monthData, woMonthData)
      console.log(data)
      this.setState({
        woMonthData: data,
        xData: [...xData]
      })
    }
  }

  updateMonthData = (initMonthData, woMonthData) => {
    woMonthData.forEach(item => {
      item.name.forEach(x => {
        initMonthData[item._id][x.name] = x.count;
      })
    })
    return initMonthData;
  }

  createXData = (data) => {
    let xSet = new Set();
    data.forEach(item => {
      item.name.forEach(x => {
        xSet.add(x.name)
      })
    })
    return xSet;
  }

  initMonthData = (xData) => {
    let result = [];
    for (let i = 1; i <= 12; i++) {
      let temp = new Object();
      temp['month'] = i + '月';
      for (let item of xData) {
        temp[item] = 0;
      }
      result.push(temp)
    }
    return result;
  }
  componentDidMount() {
    this.getData();
  }
  render() {

    const { xData, woMonthData } = this.state;
    const ds = new DataSet()
    const dv = ds.createView().source(woMonthData)
    dv.transform({
      type: "fold",
      fields: xData,
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    })
    const cols = {
      month: {
        range: [0, 1]
      }
    }
    return (
      <div style={{ float: 'right', width: 750, height: 300 }}>
        <Chart height={250} data={dv} scale={cols} forceFit >
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}个`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
export default connect(state => ({ user: state.user }))(Line); 