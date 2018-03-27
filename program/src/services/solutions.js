import axios from 'axios';
import Cookies from 'js-cookie';
import { URL1 } from '../constant/config';

// 获取我的所有的方案列表
export async function getAllSolutions(userId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'get',
    url: URL1 + `/api/users/${userId}/solution_reqs`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("方案列表",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 提交方案
export async function postSolution(data) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'post',
    url: URL1 + '/api/solutions',
    headers: {
      Authorization: access_token,
    },
    data,
  }).then((response) => {
    console.log('提交方案响应', response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 获取我的方案详情
export async function getMySolutionDetail(userId, reqId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'get',
    url: URL1 + `/api/users/${userId}/solution_reqs/${reqId}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("方案列表",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}

// 删除我的方案
export async function deleteMySolution(solutionId) {
  const access_token = Cookies.get('access_token');
  return axios({
    method: 'delete',
    url: URL1 + `/api/solutions/${solutionId}`,
    headers: {
      Authorization: access_token,
    },
  }).then((response) => {
    // console.log("方案列表",response);
    const { status, statusText } = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data,
    });
  });
}
