import React, { Component } from 'react';
import Logo from '../../assets/imags/logo.png';
import { Link, withRouter } from 'react-router-dom';
import './leftNav.less';
import { findIndex, find, indexOf } from 'lodash';
import { Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ToolOutlined,
    BarChartOutlined,
    StockOutlined,
    PieChartOutlined,
    UserOutlined,
    AreaChartOutlined,
    InsuranceOutlined,
    RedEnvelopeOutlined
} from '@ant-design/icons';
import Line from '../../pages/charts/line';
import { connect } from 'react-redux';
import { menuList } from '../../config/menuConfig';
const { SubMenu } = Menu;

export class leftNav extends Component {

    iconMapping = (iconName) => {

        switch (iconName) {
            case 'HomeOutlined':
                return <HomeOutlined />
            case 'AppstoreOutlined':
                return <AppstoreOutlined />
            case 'BarChartOutlined':
                return <BarChartOutlined />
            case 'BarsOutlined':
                return <BarsOutlined />
            case 'ToolOutlined':
                return <ToolOutlined />
            case 'StockOutlined':
                return <StockOutlined />
            case 'PieChartOutlined':
                return <PieChartOutlined />
            case 'UserOutlined':
                return <UserOutlined />
            case 'AreaChartOutlined':
                return <AreaChartOutlined />
            case 'InsuranceOutlined':
                return <InsuranceOutlined />
            case 'RedEnvelopeOutlined':
                return <RedEnvelopeOutlined />
            default:
                break;
        }

    }


    hasAuth = (item) => {
        const { key } = item;
        const menus = this.props.user.role.menus;
        const username = this.props.user.username;
        if (username === 'admin' || indexOf(menus, key) !== -1) {

            return true;
        } else if (item.hasOwnProperty('children')) {
            return !!find(item.children, (o) => find(menus, o.key) !== -1);
        }
        return false;
    }

    getMenuItem = (node) => {
        return node.map(item => {
            if (!this.hasAuth(item)) {
                return;
            }
            if (item.hasOwnProperty('children')) {
                return <SubMenu
                    key={item.key}
                    title={
                        <span>
                            {this.iconMapping(item.icon)}
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {this.getMenuItem(item.children)}
                </SubMenu>
            } else {
                return <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <span>{this.iconMapping(item.icon)}
                            <span>{item.title}</span>
                        </span>
                    </Link>
                </Menu.Item>
            }
        })
    }

    componentWillMount() {
        this.menuNodes = this.getMenuItem(menuList);
    }
    render() {
        const path = this.props.location.pathname;
        return (
            <>
                <div className='left-nva'>
                    <Link to={'/'} className='left-nva-header'>
                        <h1>家政管理平台</h1>
                    </Link>
                </div>
                <Menu
                    selectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                >

                    {this.menuNodes}
                </Menu>
            </>
        )
    }
}

export default connect(state => ({ user: state.user }))(withRouter(leftNav));

