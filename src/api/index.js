import ajax from './ajax';
import jsonp from 'jsonp';
import CryptoJS from 'crypto-js';
import { message } from 'antd';

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

export const reqAddUser = (user) => ajax('/manage/user/update', user, 'POST');

export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `http://api.seniverse.com/v3/weather/now.json`;
        var UID = 'Po0AVKR2Wdj29fJy7';
        var KEY = 'Sq4vKk_UhYjFbIuZg'
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

export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId });

export const reqUpdateCategory = ({ categoryId, categoryName, price }) => ajax('/manage/category/update', { categoryId, categoryName, price }, 'POST');

export const reqAddCategory = (categoryName, parentId, price) => { return ajax('/manage/category/add', { categoryName, parentId, price }, 'POST') };

export const reqCategoryInfo = (parentId, userId) => ajax('/manage/wo/list', { parentId, userId });

export const reqAllWo = (pageNum, pageSize, userId) => ajax('/manage/wo/all', { pageNum, pageSize, userId });

export const reqAddOrUpdateWo = (wo) => ajax('/manage/product/add', wo, 'POST');

export const reqDelectWo = (woId) => ajax('/manage/wo/delete', { woId }, 'POST');

export const reqWo = _id => ajax('/manage/wo/one', { _id });

export const reqUpdateWoStatus = (woId, status) => ajax('/manage/wo/updateStatus', { woId, status }, 'POST')

export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'POST')

export const reqSearchWos = ({ pageNum, pageSize, searchName, searchType }) => ajax('/manage/wo/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
})

export const reqCategory = categoryId => ajax('/manage/category/info', { categoryId })

export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', { roleName }, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', { userId }, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');

export const reqUserRole = (roleId) => ajax('/manage/user/auth', { roleId });

