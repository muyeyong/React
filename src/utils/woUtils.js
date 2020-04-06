export default {
  getWoId(){
    var str = '0123456789';
    var result = "";
    for(var i = 0; i < 6; i++) {
        result += str[parseInt(Math.random() * str.length)];
    }
    return result;
  }
}