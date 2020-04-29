import React, { Component } from 'react';
import { Card, Button } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { reqCategorys, reqWoList } from '../../api';

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {

    state = {
        categorys: [],
        wosNamber: []
    }


    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        let result = await reqCategorys('0');
        if (result.status === 0) {
            let categorys = result.data;
            let categorysId = categorys && categorys.map(item => item._id);
            let categorysName = categorys && categorys.map(item => item.name)
            result = await reqWoList(JSON.stringify(categorysId));
            if (result.status === 0) {
                let wosNumber = result.data;
                this.setState({
                    categorys: categorysName,
                    wosNamber: wosNumber
                })
            }
        }
    }




    /*
    返回柱状图的配置对象
     */
    getOption = () => {
        const { wosNamber, categorys } = this.state;
        return {
            title: {
                text: '订单数据'
            },
            tooltip: {},
            legend: {
                data: ['订单数']
            },
            xAxis: {
                data: categorys
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '总订单数',
                type: 'bar',
                data: wosNamber,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
        }
    }

    render() {
        return (
            <div>
                <Card title='柱状图一'>
                    <ReactEcharts option={this.getOption()} />
                </Card>

            </div>
        )
    }
}