 //时间戳转换方法    date:时间戳数字
nextDay=function(date) {
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1);
    return YY + MM + DD;//返回的string类型的
}  
 nowDay=function(date){
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    return YY + MM + DD ;//返回的string类型的
}
nextMonth = function (date) {
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +1)+'-'+"31";
    return YY + MM 
}
nowMonth = function (date) {
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)+'-'+"01";
    return YY + MM
}
module.exports = {
    nowDay,
    nextDay,
    nowMonth,
    nextMonth
}