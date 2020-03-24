import React ,{Component} from 'react';
import {Layout} from 'antd';
import {Route,BrowserRouter as Router,Switch,Redirect} from 'react-router-dom'
import LeftNav from '../../components/left-nav/leftNav';
import Header from '../../components/header/Header';
import Category from '../category/category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import User from '../user/user';
import Product from '../product/product';
import Role from '../role/role';
import Home from '../Home/home';

const {Sider,Content,Footer} = Layout

export default class Admin extends Component{
    render(){
        return <>
        <Layout style={{height:'100%'}}>
            <Sider><LeftNav/></Sider>
            <Layout>
                <Header></Header>
                <Content style={{backgroundColor:'#fff',margin:20}}>
                  <Switch>
                      <Route path='/home' component={Home}></Route>
                      <Route path='/user' component={User}></Route>
                      <Route path='/role' component={Role}></Route>
                      <Route path='/category' component={Category}></Route>
                      <Route path='/product' component={Product}></Route>
                      <Route path='/charts/pie' component={Pie}></Route>
                      <Route path='/charts/line' component={Line}></Route>
                      <Route path='/charts/bar' component={Bar}></Route>
                      <Redirect to='/home'></Redirect>
                  </Switch>
                </Content>
                <Footer style={{textAlign:'center',color:'#cccc'}}>底部</Footer>
            </Layout>
        </Layout>
        </>
    }
}