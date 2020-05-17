import ajax from './ajax';
import jsonp from 'jsonp';
import CryptoJS from 'crypto-js';
import { message } from 'antd';

//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');  //已处理

//增加用户
export const reqAddUser = (user) => ajax('/manage/user/update', user, 'POST'); //已处理

//请求天气信息 心知天气api  https://docs.seniverse.com/api/weather/now.html   //已处理
// uid是公钥 key是私钥
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.seniverse.com/v3/weather/now.json`;
        var UID = 'Po0AVKR2Wdj29fJy7';
        var KEY = 'Sq4vKk_UhYjFbIuZg';
        var LOCATION = city;
        var ts = Math.floor((new Date()).getTime() / 1000);
        // 构造验证参数字符串
        var str = "ts=" + ts + "&uid=" + UID;

        // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
        // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
        var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
        sig = encodeURIComponent(sig);
        str = str + "&sig=" + sig;
        jsonp(url + "?location=" + LOCATION + "&" + str, {}, (err, data) => {
            if (!err && data.results) {
                const picCode = data.results[0].now.code;
                const weather = data.results[0].now.text;
                resolve({ picCode, weather });
            } else {
                message.error(err);
            }
        })
    })
}

//获取分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId });   //已处理

//更新分类信息
export const reqUpdateCategory = ({ categoryId, categoryName, price }) => ajax('/manage/category/update', { categoryId, categoryName, price }, 'POST'); //已处理

//增加分类
export const reqAddCategory = (categoryName, parentId, price) => { return ajax('/manage/category/add', { categoryName, parentId, price }, 'POST') };   //已处理



//获取对应用户的wo
export const reqAllWo = (pageNum, pageSize, userId) => ajax('/manage/wo/all', { pageNum, pageSize, userId });//已处理

//添加/更新wo
export const reqAddOrUpdateWo = (wo) => ajax('/manage/product/add', wo, 'POST'); //已处理

//删除wo
export const reqDelectWo = (woId) => ajax('/manage/wo/delete', { woId }, 'POST');  //已处理

//根据woId获取wo
export const reqWo = _id => ajax('/manage/wo/one', { _id });  //已处理

//获取接单广场里面的wo
export const reqServiceWos = (pageNum, pageSize) => ajax('/manage/wo/serviceWo', { pageNum, pageSize })  //已处理

//获取用户wo的数量
export const reqWoCount = (parentIds, roleId, userId) => ajax('/manage/wo/count', { parentIds, roleId, userId });  //已处理

//更新wo状态
export const reqUpdateWoStatus = (woId, status, serviceStaffId) => ajax('/manage/wo/updateStatus', { woId, status, serviceStaffId }, 'POST') //已处理

//删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')  //已处理

//服务申请-->根据关键字搜索wo
export const reqSearchWos = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/wo/search', {//已处理
    pageNum,
    pageSize,
    [searchType]: searchName,
})

//根据用户id获取wo的月份数量信息
export const reqWoMonthData = (roleId, userId) => ajax('/manage/wo/monthData', { roleId, userId })  //已处理

//接单广场--> 订单搜索（分页处理）
export const reqSearchServiceWos = ({ pageNum, pageSize, searchName, searchType }) => //已处理
    ajax('/manage/wo/searchServiceWo', {
        pageNum,
        pageSize,
        [searchType]: searchName,
    })

//没啥用
export const reqCategory = categoryId => ajax('/manage/category/info', { categoryId });

//获取角色列表
export const reqRoles = () => ajax('/manage/role/list')  //已解决

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', { roleName }, 'POST') //已解决

// 更新角色（给角色设置权限）
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST') //已解决

// 获取所有用户的列表 
export const reqUsers = () => ajax('/manage/user/list')  //已处理
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', { userId }, 'POST')  //已处理

// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');  //已处理

//根据用户角色判断权限
export const reqUserRole = (roleId) => ajax('/manage/user/auth', { roleId }); //已解决
