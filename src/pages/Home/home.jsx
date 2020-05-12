import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reqCategorys, reqWoCount } from '../../api';
import {
    Icon,
    Card,
    Statistic,
} from 'antd'
import Line from './line'
import './home.less'
import { getUserAuth } from '../../redux/actions';

class Home extends Component {
    state = {
        isVisited: true,
        categorys: [],
        wosNamber: [],
        woCounts: 0
    }

    getData = async () => {
        let result = await reqCategorys('0');
        if (result.status === 0) {
            let categorys = result.data;
            let categorysId = categorys && categorys.map(item => item._id);
            result = await reqWoCount(JSON.stringify(categorysId), this.props.user.role_id, this.props.user._id);
            if (result.status === 0) {
                let wosCount = result.data.reduce((x, y) => x + y, 0);
                this.setState({
                    woCounts: wosCount
                })
            }
        }
    }

    handleChange = (isVisited) => {
        return () => this.setState({ isVisited })
    }
    componentDidMount() {
        const { getUserAuth, user: { role_id }, user } = this.props;
        getUserAuth(role_id);
        this.getData();
    }
    render() {
        const { woCounts } = this.state
        return (
            <div className='home'>
                <Card
                    className="home-card"
                    title="订单总数"
                    extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
                    // style={{ width: 250 }}
                    headStyle={{ color: 'rgba(0,0,0,.45)' }}
                >
                    <Statistic
                        value={woCounts}
                        suffix="个"
                        style={{ fontWeight: 'bolder' }}
                    />
                </Card>
                <div className="home-line">
                    <h2>订单月份统计</h2>
                    <Line />
                </div>

            </div>
        )
    }
}

export default connect(state => ({ user: state.user }), { getUserAuth })(Home); 