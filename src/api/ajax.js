import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET') {
    let promise
    return new Promise((resolve,reject)=>{
        if(type === 'GET'){
            promise = axios.get(url,{params:data});
        }else if(type === 'POST'){
            promise = axios.post(url,data);
        }
        promise.then(response=> {resolve(response.data)}).catch((err)=>{
            message.error(err.message)
        })
    })
}