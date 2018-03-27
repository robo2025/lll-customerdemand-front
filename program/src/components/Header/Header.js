import React from 'react';
import { Navbar, Nav, NavItem, Clearfix, MenuItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { connect } from 'dva';
import { logout, login, register } from '../../services/user';
import { queryString } from '../../utils/tools';
import './header.css';


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


  render() {
    const { data } = this.props;

    const userInfo = Cookies.getJSON('userinfo');
    console.log('props', userInfo);
    

    return (
      <header>
        <Navbar collapseOnSelect className="header">
          <Navbar.Header onClick={() => { window.location.hash = '#/'; }}>
            <img
              src={require('../Footer/logo-white.png')}
              style={{ height: '60px', float: 'left', marginLeft: '0px' }}
              alt="图片"
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
              <NavItem eventKey={2} href="#/me" className="me">
                个人中心<span className="caret" />
                {
                  userInfo ?
                    (
                      <ul className="dropdown-menu open ">
                        <MenuItem>
                          <img 
                            src={require('./avatar_grey.png')}
                            alt="头像"
                            with={30}
                            height={30}
                          />
                        </MenuItem>                                              
                        <MenuItem>{userInfo.username}</MenuItem>                        
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
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

