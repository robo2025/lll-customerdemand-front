import Cookies from 'js-cookie';
import { LOGIN_URL, NEXT_URL, HOME_PAGE, VERIFY_PAGE } from '../constant/config';

// 验证是否登录
export function verifyLogin(successUrl) {
  const href = window.location.href;
  console.log('页面地址:', href);
  const paramas = queryString.parse(href);
  /* 判断url是否有access_token,如果有则将其存储到cookie */
  if (paramas.access_token) {
    const access_token = paramas.access_token.split('#/')[0];
    console.log('token:', access_token);
    Cookies.set('access_token', access_token, { expires: 7 });
    // const nextUrl = window.localStorage.getItem('nextUrl'); // 从localStorage读取跳转url
    // window.location.href = nextUrl || HOME_PAGE;
  } else {
    console.log('不存在token');
    window.location.href = LOGIN_URL + `?next=${VERIFY_PAGE}`;
  }
  // 读取cookie，如果没有access_token,则跳转到登录页面
  // /* if (!Cookies.get('access_token')) {
  //    console.log('用户未登录');
  //    // window.location.href = REGISTER_URL + '?next='+ LOGIN_URL + "?next=" + NEXT_URL;
  //    window.location.href = LOGIN_URL + '?next=' + NEXT_URL;
  //  } else {
  //    console.log('用户已登录',Cookies.get('access_token'));
  //    // window.location.href = HOME_PAGE;
  //  }*/
}

// 未登录状态跳转到验证页面
export function jumpToVerify() {
  window.location.href = VERIFY_PAGE;
}

export function jumpToPage(url) {
  window.location.href = LOGIN_URL + `?next=${encodeURIComponent(url)}`;
}

// 解析url
export const queryString = {
  parse(url) {
    const parseObj = {};
    if (!url) {
      return false;
    }
    let argStr = '';
    if (url.split('?').length > 1) {
      argStr = url.split('?')[1];
      const argArr = argStr.split('&');
      argArr.forEach((val) => {
        const args = val.split('=');
        if (args.length > 1) {
          parseObj[args[0]] = args[1];
        }
      });
    }
    return parseObj;
  },
};


// 验证文件类型
export const fileArr = ['pdf', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx'];
export function checkFile(filename, fileArr) {
  const postfix = filename.split('.')[1];
  for (let i = 0, fileLen = fileArr.length; i < fileLen; i++) {
    if (postfix === fileArr[i]) {
      return true;
    }
  }
}


// 时间戳转年月日时分秒
export function timeStampToDate(timeStamp) {
  const date = new Date(timeStamp);
  const time = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    H: date.getHours(),
    M: date.getMinutes(),
    S: date.getSeconds(),
  };
  return { ...time, timeStr: `${time.year}-${time.month}-${time.day} ${time.H}:${time.M}:${time.S}` };
}
