import axios from "axios";
import Cookies from "js-cookie";
import {URL,LOGOUT_URL,HOME_PAGE,LOGIN_URL,VERIFY_PAGE,REGISTER_URL} from "../constant/config"
import {verifyLogin} from "../utils/tools";

export async function query(params) {
  let access_token = Cookies.get("access_token");
  return axios({
    method: 'get',
    url: URL + '/server/verify',
    headers: {
      Authorization: access_token
    },
  }).then((response) => {
    const {status,statusText} = response;
    return Promise.resolve({
      status,
      statusText,
      ...response.data
    })
  })
}

//注册操作
export function register() {
  window.location.href = REGISTER_URL + `?next=${LOGIN_URL}?next=${encodeURIComponent(VERIFY_PAGE)}`;
}
//登出
export function logout() {
  let access_token = Cookies.get("access_token");
  Cookies.remove('access_token');
  window.location.href = LOGOUT_URL + `?access_token=${access_token}&next=${HOME_PAGE}`;
}

//登录操作
export function login() {
  window.localStorage.setItem('nextUrl',window.location.href);
  // console.log("登录URL--------------",LOGIN_URL + `?next=${encodeURIComponent(VERIFY_PAGE)}`);
  window.location.href = LOGIN_URL + `?next=${encodeURIComponent(VERIFY_PAGE)}`;
}
