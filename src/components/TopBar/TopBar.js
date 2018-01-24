import React from "react";
import {Icon} from 'antd';
import {connect} from "dva";
import {logout,login,register} from "../../services/user";
import "./topbar.css";
import {jumpToVerify} from "../../utils/tools";
import Cookies from "js-cookie";


@connect(
  state => ({...state})
)
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutAccout = this.logoutAccout.bind(this);
  }

  //注册账号
  registerAccount(){
    register();
  }

  /*登出账号*/
  logoutAccout() {
    logout();
  }

  //登录账号
  loginAccount() {
    // jumpToVerify();
    login();
  }

  componentDidMount() {
    // console.log(this.props);
    if(Cookies.get('access_token')){
       this.props.dispatch({
            type: 'user/fetch'
       })
    }
  }

  render() {
    // console.log("顶部调：",this.props);
    let user = this.props.user?this.props.user.userinfo:{};
    return (
      <div className="container">
        <span className="welcome">{/*欢迎光临工业魔方-智能方案解决中心*/}</span>
        {
          user.id ?
            <div className="topBar-right">
              <div className="user-login">
                <Icon type="user" style={{fontSize: '14px', marginRight: '5px'}}/>
                <span>{user.username}</span>
                <Icon type="down" style={{fontSize: '12px', marginRight: '5px'}} className="arrow"/>
              </div>
              <div className="logo-out" onClick={this.logoutAccout}>退出登录</div>
            </div> :
            <div className="login-register">
              <a onClick={this.loginAccount}>登录</a>
              <span>｜</span>
              <a onClick={this.registerAccount}>注册</a>
            </div>
        }
      </div>
    )
  }
}

