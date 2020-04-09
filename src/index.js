import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
// import 'antd/dist/antd.css'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import { Provider } from 'react-redux'
import store from './redux/store'

memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))