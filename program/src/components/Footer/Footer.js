import React from "react";
import {Layout} from "antd";
import './footer.css';
import {LOGIN_URL,REGISTER_URL,NEXT_URL} from "../../constant/config";
import {login,register} from "../../services/user";

const {Content} = Layout;
// 页脚组件
// 备案号 京ICP备17065244号-1
class Footer extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <Content style={{backgroundColor: 'rgba(0,0,0,0)', marginTop: '1.5rem'}}>
          <div className="footer-left">
            <div className="footer-logo">
              <img src={require("./logo.png")}/>
            </div>
          </div>
          <div className="footer-center">
            <a href="javascript:void (0);">关于我们</a>
            <span>|</span>
            <a onClick={register}>注册新用户</a>
            <span>|</span>
            <a onClick={login}>用户登录</a>
            <span>|</span>
            <a href="javascript:void (0);">联系我们</a>
            <p>京ICP备17065244号-1 | copyright © 湖南孚中版权所有. all right reserved.</p>
          </div>
          <div className="footer-right">
            <div className="footer-erweima">
              <img src={require('./erweima.png')}/>
            </div>
            <p>扫一扫</p>

          </div>
        </Content>
      </div>
    )
  }
}

export default Footer;
