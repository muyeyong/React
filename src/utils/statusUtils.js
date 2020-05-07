export default {
  getWoStatus(statusId, deadline) {
    if (deadline < Date.now()) return '订单已过期'
    switch (statusId) {
      case 0: return '等待接收订单'
      case 1: return '订单派送中'
      case 2: return '订单已被拒接'
      case 3: return '订单进行中'
      default: return '订单已完成'
    }
  },
}