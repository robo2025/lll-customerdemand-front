import axios from 'axios';
import Cookies from 'js-cookie';
import { URL1 } from '../constant/config';


// 增加需求
export async function postDemand(data) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'post',
    url: URL1 + '/api/reqs',
    headers: {
      Authorization: access_token,
    },
    data,
  }).then((response) => {
    console.log('增加需求', response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 获取所有需求
export async function getAllDemand(offset, limit) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'get',
    url: URL1 + `/api/reqs?offset=${offset}&limit=${limit}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("获取所有需求列表响应：",response);
    const { status, statusText, headers } = response;
    return Promise.resolve({
      status,
      statusText,
      headers,
      ...response.data,
    });
  });
}

// 获取我的需求
export async function getMyDemand(userId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'get',
    url: URL1 + `/api/users/${userId}/reqs`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("我的需求列表",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 删除需求（通过req_id）
export async function removeDemand(reqId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'DELETE',
    url: URL1 + `/api/reqs/${reqId}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("删除需求响应",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 获取需求详情
export async function getDemandDetail(reqId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'get',
    url: URL1 + `/api/reqs/${reqId}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("删除需求响应",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}
