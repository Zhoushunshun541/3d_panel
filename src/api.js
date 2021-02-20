import axios from 'axios';
// import qs from 'qs';

// const http = axios.create({
//   baseURL:
//     process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_API}` : '',
//   timeout: 30000,
// });

// 获取天气信息
// export const weatherInfo = params => {
//   return axios.get('/api-weather/telematics/v3/weather', {
//     params,
//   });
// };

export const weatherInfo = params => {
  return axios.get('http://api.map.baidu.com/telematics/v3/weather', {
    params,
  });
};
