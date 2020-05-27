import React, { Component } from 'react';
import './header.less';
import { formateDate } from '../../utils/dateUtils';
import { reqWeather } from '../../api/index';
import { withRouter } from 'react-router-dom';
import { menuList } from '../../config/menuConfig'
import LinkButton from '../link-button';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';

class Header extends Component {

    state = {
        currentTime: '',
        picUrl: '',
        weather: ''
    }

    getTime = () => {
        this.intervald = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({ currentTime });
        }, 1000);

    }

    getWeather = async () => {
        const { picCode, weather } = await reqWeather('长沙');
        const picUrl = require(`./images/weatherPic/${picCode}@1x.png`);
        this.setState({ weather: weather, picUrl: picUrl });
    }


    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) title = item.title;
            } else if (item.key === path) {
                title = item.title;
            }
        })
        return title;
    }


    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    logout = () => {
        Modal.confirm({
            title: '确定退出?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                this.props.logout();
                this.props.history.replace('/login');
            },
        });

    }

    componentWillUnmount() {
        clearInterval(this.intervald);
    }

    render() {
        const { currentTime, picUrl, weather } = this.state;
        const userName = this.props.user.username

        const title = this.getTitle();
        return (<>
            <div className='header'>
                <div className='header-top'>
                    <span> 欢迎,{userName}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={picUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>

            </div>
        </>
        )
    }
}


const wrapHeader = withRouter(Header);
export default connect(
    state => ({ user: state.user }),
    { logout }
)(wrapHeader)
