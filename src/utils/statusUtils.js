export default {
  getWoStatus(statusId, deadline) {
    if (deadline < Date.now()) return '订单已过期'
    switch (statusId) {
      case 0: return '等待接收订单'
      case 1: return '订单已经接收'
      case 2: return '订单已被拒接'
      case 3: return '订单进行中'
      default: return '订单已完成'
    }
  },

  getWoNextStatus(statusId) {
    switch (statusId) {
      case 0: return '接收订单'
    }
  }
}