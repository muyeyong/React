import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
// import 'antd/dist/antd.css'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<App/>,document.getElementById('root'))