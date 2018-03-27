/*
* 个人中心的数据
* */

import axios from 'axios';
import Cookies from 'js-cookie';
import { URL1 } from '../constant/config';

// 获取所有的方案列表 |已废弃
export async function getSolutions(reqId) {
  const access_token = Cookies.get('access_token');
  const userId = window.sessionStorage.getItem('user_id');
  return axios({
    method: 'get',
    url: URL1 + `/api/users/${userId}/reqs/${reqId}/solutions`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("我的需求的-方案列表响应",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 获取我的需求 已题方案详情
export async function getMyReqSolution(reqId, solutionId) {
  const access_token = Cookies.get('access_token');
  const userId = window.sessionStorage.getItem('user_id');
  return axios({
    method: 'get',
    url: URL1 + `/api/users/${userId}/reqs/${reqId}/solutions/${solutionId}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("我的需求的-方案列表响应",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}
