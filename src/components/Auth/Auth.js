import React from "react";
import {withRouter} from "dva/router";
import Cookies from "js-cookie";
import {LOGIN_URL, NEXT_URL,HOME_PAGE} from "../../constant/config";

//鉴权组件
@withRouter
class Auth extends React.Component{

  componentDidMount(){
    console.log("验证页面",this.props);
    const publicPath = ['/','/detail','public'];
    let pathname = this.props.location.pathname;
    if(publicPath.indexOf(pathname) >= 0){
      console.log("您现在访问时公共页面,不需要登录",pathname)
    }else{
      console.log("您现在访问的页面必须登录");
      //读取cookie，如果没有access_token,则跳转到登录页面
      if (!Cookies.get('access_token')) {
        console.log('用户未登录');
        // window.location.href = REGISTER_URL + '?next='+ LOGIN_URL + "?next=" + NEXT_URL;
        window.location.href = LOGIN_URL + '?next=' + NEXT_URL;
      } else {
        console.log('用户已登录',Cookies.get('access_token'));
        window.location.href = HOME_PAGE;
      }

    }
  }

  render(){

    return <div></div>
  }
}

export default Auth;
