import ajax from './ajax';
import jsonp from 'jsonp';
import CryptoJS from 'crypto-js';

export const reqLogin = (username, password) => ajax('./login', { username, password }, 'POST');

export const reqAddUser = (user) => ajax('/manage/user/update', user, 'POST');

export const reqWeather = (city) => {
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
        console.log('jsonp   ', err, data);
    })
}

reqWeather('长沙');