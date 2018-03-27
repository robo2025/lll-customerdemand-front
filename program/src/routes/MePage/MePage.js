
import React from 'react';
import Cookies from 'js-cookie';
import { connect } from 'dva';
import { Tabs, Layout, Spin } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PublishedPage from '../PublishedPage/PublishedPage';
import SolutionPage from '../SolutionPage/SolutionPage';
import { queryString } from '../../utils/tools';

import './mepage.less';
import MyBreadcrumb from '../../components/MyBreadcrumb/MyBreadcrumb';

const { TabPane } = Tabs;
const { Content } = Layout;

@connect(
  state => ({ ...state })
)
class MePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
 

  componentDidMount() {
    const userId = Cookies.getJSON('userinfo').id;
    // 请求我的方案列表
    this.props.dispatch({
      type: 'solutions/getMySolutions',
      userId,
    });
    // 请求我的需求列表
    this.props.dispatch({
      type: 'demand/getMyDemands',
      userId,
    });
  }

  handleClick(key) {
    console.log('选中tab:', key);
  }

  render() {
    console.log('Me', this.props);
    // 我的需求列表
    const myDemandsList = this.props.demand.myDemandList;
    // 我的方案列表
    const mySolutionsList = this.props.solutions.solutionsList;
    console.log('mysolutionlist', mySolutionsList);
    // 默认展示那个tab页面
    const activeTabKey = queryString.parse(this.props.location.search).tab;
    return (
      <div className="me">
        <Header />
        <MyBreadcrumb />
        <Content>
          <Tabs defaultActiveKey={activeTabKey || '1'} onChange={this.handleClick}>
            <TabPane tab="我发布的需求" key="1">
              <Spin spinning={this.props.loading.models.demand}>
                <PublishedPage data={myDemandsList} />
              </Spin>
            </TabPane>
            <TabPane tab="我提供的解决方案" key="2">
              <Spin spinning={this.props.loading.models.solutions}>
                <SolutionPage data={mySolutionsList} />
              </Spin>
            </TabPane>
          </Tabs>
        </Content>
        <Footer />
      </div>
    );
  }
}

export default MePage;
