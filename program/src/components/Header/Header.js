import React from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {connect} from "dva";
import {queryString} from "../../utils/tools";
import "./header.css";

@connect()
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args:queryString.parse(window.location.href)
    }
  }

  componentDidMount() {
    console.log("头部渲染好了",this.state.args.page);
    let page = this.state.args.page?this.state.args.page:1;
    let pageSize = 15;
    this.props.dispatch({
      type: 'demand/getAllDemands',
      offset:(page-1)*pageSize,
      limit:'15'
    });
  }

  render() {
    return (
      <header>
        <Navbar collapseOnSelect className="header">
          <Navbar.Header>
            <img src={require('../Footer/logo-white.png')} style={{height: '60px', float: 'left', marginLeft: '0px'}}/>
            <Navbar.Brand>
              <a href='#'>智能方案中心</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#/publish">
                发布需求
              </NavItem>
              <NavItem eventKey={2} href="#/me">
                个人中心
              </NavItem>
              {/*<NavItem eventKey={2} href="#/published">*/}
              {/*我发布的需求*/}
              {/*</NavItem>*/}
              {/*<NavItem eventKey={2} href="#/solution">*/}
              {/*我提供的解决方案*/}
              {/*</NavItem>*/}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}


