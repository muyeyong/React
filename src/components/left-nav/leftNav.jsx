import React, { Component } from 'react';
import Logo from '../../assets/imags/logo.png';
import { Link ,withRouter} from 'react-router-dom';
import './leftNav.less';
import { Menu, Icon } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined ,
    BarsOutlined,
    ToolOutlined,
    BarChartOutlined,
    StockOutlined,
    PieChartOutlined,
    UserOutlined,
    AreaChartOutlined,
    InsuranceOutlined 
  } from '@ant-design/icons';
import Line from '../../pages/charts/line';
import {menuList} from '../../config/menuConfig';
const { SubMenu } = Menu;

export class leftNav extends Component {

    iconMapping = (iconName)=>{
      
        switch (iconName) {
            case 'HomeOutlined':
                return <HomeOutlined />
            case 'AppstoreOutlined':
                return <AppstoreOutlined/>
            case 'BarChartOutlined':
                return <BarChartOutlined/>
            case 'BarsOutlined':
                return <BarsOutlined/>
            case 'ToolOutlined':
                return <ToolOutlined/>
            case 'StockOutlined':
                return <StockOutlined/>
            case 'PieChartOutlined':
                return <PieChartOutlined />
            case 'UserOutlined':
                return <UserOutlined />
            case 'AreaChartOutlined':
                return <AreaChartOutlined />
           case 'InsuranceOutlined':
               return <InsuranceOutlined/>
            default:
                break;
        }
       
    }

    getMenuItem = (node)=>{
     return   node.map(item =>{
           if(item.hasOwnProperty('children')){
           return  <SubMenu
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
           }else{
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
    render() {
        const path = this.props.location.pathname;
        console.log(path)
        return (
            <>
                <div className='left-nva'>
                    <Link to={'/'} className='left-nva-header'>
                        <img src={Logo} alt='log' />
                        <h1>家政管理平台</h1>
                    </Link>
                </div>
                <Menu
                   selectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                >

                    {this.getMenuItem(menuList)}
                    {/* <Menu.Item key="1">
                        <Link to='/home'>
                        <span>首页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                 <MailOutlined />
                                <span>商品</span>
                            </span>
                        }
                    >
                         <Menu.Item key="3"><Link to='/category'><span>品类管理</span></Link></Menu.Item>
                         <Menu.Item key="4"><Link to='/product'><span>商品管理</span></Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5"><Link to='/role'><span>角色管理</span></Link></Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                 <MailOutlined />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                         <Menu.Item key="7"><Link to='/charts/bar'><span>柱状图</span></Link></Menu.Item>
                            <Menu.Item key="8"><Link to='/charts/pie'><span>饼状图</span></Link></Menu.Item>
                            <Menu.Item key="9"><Link to='/charts/line'><span>折线图</span></Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </>
        )
    }
}

export default withRouter(leftNav) 
