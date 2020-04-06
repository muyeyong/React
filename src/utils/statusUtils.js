export default {
  getWoStatus(statusId){
    switch(statusId){
      case 0: return '等待接收订单'
      case 1: return '订单已经接收'
      case 2: return '订单已被拒接'
      case 3: return '订单进行中'
      default: return '订单已完成'
    }
  }
}