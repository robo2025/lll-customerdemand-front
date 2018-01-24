/*
* sso：      https://login.robo2025.com
* 需求发布API：http://139.199.96.235:9002
* */

//单点登录URL
export const URL = 'https://login.robo2025.com';
// export const URL = 'http://192.168.3.70:8011';

//网站内容接口URL
export const URL1 = 'http://139.199.96.235:9002';

//验证登录接口URL
export const LOGIN_URL = URL + '/server/authorize';

//注册接口URL
export const REGISTER_URL = URL + '/register';

//登录接口URL
export const LOGOUT_URL = URL + '/logout';

// 静态web服务器地址,端口和地址必须要写，80端口可不写
let myHost = "http://192.168.4.10:8000";
// let myHost = 'http://66.112.216.3:8000';

//前端登录验证URL
export const NEXT_URL = myHost+'/#/test';

//前端首页URL
export const HOME_PAGE = myHost+'/#/';

//前端验证URL
export const VERIFY_PAGE = myHost+'/#/test';

//文件服务器URL
export const FILE_SERVER = '//imgcdn.robo2025.com/';




