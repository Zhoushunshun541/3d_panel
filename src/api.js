import axios from 'axios';
// import qs from 'qs';

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `${process.env.VUE_APP_API}`
      : '/api',
  timeout: 30000,
});
// 拦截器  请求之前做点啥
http.interceptors.request.use(
  config => {
    // 判断store是否有token 有就加入请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回的时候拦截一下
http.interceptors.response.use(
  res => {
    if (res.status === 200) {
      res.data.status = 1;
    } else {
      res.data.status = 0;
    }
    return res.data;
  },
  error => {
    // 异常返回 根据相应的状态码进行对应操作
    if (error.response) {
      switch (error.response.status) {
        case 403:
          localStorage.clear();
          window.location.href = '/';
          break;
        case 401:
          localStorage.clear();
          window.location.href = '/';
          break;
        default:
          return error.response.data;
      }
    }
    return error.response.data;
  }
);
// 获取天气信息
export const weatherInfo = params => {
  return http.get('/public/weather', {
    params,
  });
};

// 周接单详情
export const business_week_order = params => {
  return http.get('/business/week_order', {
    params,
  });
};

// 接单详情
export const business_order = params => {
  return http.get('/business/order', {
    params,
  });
};
