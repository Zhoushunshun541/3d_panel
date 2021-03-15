/* eslint-disable no-param-reassign */
const dateFormat = function(timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const tsDate = new Date(
    timeStamp.toString().length < 13 ? timeStamp * 1000 : timeStamp
  );

  // 对Date的原型进行拓展  加上日期格式化
  const o = {
    'M+': tsDate.getMonth() + 1, // 月份
    'd+': tsDate.getDate(), // 日
    'h+': tsDate.getHours(), // 小时
    'm+': tsDate.getMinutes(), // 分
    's+': tsDate.getSeconds(), // 秒
    'q+': Math.floor((tsDate.getMonth() + 3) / 3), // 季度
    S: tsDate.getMilliseconds(), // 毫秒
  };
  // 校验是否有  y   代表年 然后进行替换
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${tsDate.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  const oArr = Object.keys(o);
  for (let i = 0; i < oArr.length; i++) {
    if (new RegExp(`(${oArr[i]})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[oArr[i]]
          : `00${o[oArr[i]]}`.substr(`${o[oArr[i]]}`.length)
      );
    }
  }
  return fmt;
};

export { dateFormat };
