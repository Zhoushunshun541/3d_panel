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
    if (+res.status === 200) {
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

// 汇率
export const exchangeRate = params => {
  return http.get('/public/exchange', {
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

// 销售完成情况
export const business_sales_complete = params => {
  return http.get('/business/sales_complete', {
    params,
  });
};

// 人均产值
export const business_gdp = params => {
  return http.get('/business/gdp', {
    params,
  });
};

// 费用公示
export const business_cost = params => {
  return http.get('/business/cost', {
    params,
  });
};

// 排产计划
export const business_plan = params => {
  return http.get('/business/plan', {
    params,
  });
};

// 自检不良率
export const business_qc_bad = params => {
  return http.get('/business/qc_bad', {
    params,
  });
};

// 最新动态
export const business_dynamic = params => {
  return http.get('/business/dynamic', {
    params,
  });
};

// 回款超期
export const business_back_paragraph = params => {
  return http.get('/business/back_paragraph', {
    params,
  });
};
