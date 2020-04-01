export function  formateDate(date){
  if(!date) return '';
  const currentDate = new Date(date);
  return currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate()+' '+currentDate.getHours()+':'+currentDate.getMinutes()+':'+currentDate.getSeconds();
}