import React from 'react';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { logout, login, register } from '../../services/user';
import { queryString } from '../../utils/tools';
import './header.css';

@withRouter
@connect()
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: queryString.parse(window.location.href),
    };
  }

  componentDidMount() {
    console.log('头部渲染好了', this.state.args.page);
    const page = this.state.args.page ? this.state.args.page : 1;
    const pageSize = 15;
    this.props.dispatch({
      type: 'demand/getAllDemands',
      offset: (page - 1) * pageSize,
      limit: '15',
    });
  }

  // 注册账号
  registerAccount = () => {
    register();
  }

  /* 登出账号 */
  logoutAccout = () => {
    logout();
  }

  // 登录账号
  loginAccount = () => {
    login();
  }

  // 跳转到我的中心
  jumpToMycenter = () => {
    this.props.history.push('/me');
  }


  render() {
    const { data } = this.props;

    const userInfo = Cookies.getJSON('userinfo');
    console.log('props', this.props);


    return (
      <header>
        <Navbar collapseOnSelect className="header">
          <Navbar.Header>
            <img
              src={require('../Footer/logo-white.png')}
              style={{ height: '60px', float: 'left', marginLeft: '0px' }}
              alt="图片"
              onClick={() => { window.location.href = '//robo2025.com'; }}
            />
            <Navbar.Brand>
              <a href="#">智能方案中心</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/publish">
                发布需求
              </NavItem>
              <NavItem eventKey={2} className="me-center" onClick={this.jumpToMycenter}>
                个人中心<span className="caret" />
                <div className="user-box">
                  {
                    userInfo ?
                      (
                        <ul className="dropdown-menu">
                          <MenuItem>
                            <img
                              src={require('./user-icon.svg')}
                              alt="头像"
                              with={60}
                              height={60}
                              style={{ marginTop: 10 }}
                            />
                            <div style={{ margin: '10px 0' }}>{userInfo.username}</div>
                          </MenuItem>
                          <MenuItem divider />
                          <MenuItem onClick={this.logoutAccout}>登出</MenuItem>
                        </ul>
                      )
                      :
                      (
                        <ul className="dropdown-menu open ">
                          <MenuItem onClick={this.registerAccount}>注册</MenuItem>
                          <MenuItem onClick={this.loginAccount}>登录</MenuItem>
                        </ul>
                      )
                  }
                </div>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

