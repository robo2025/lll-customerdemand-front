import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PublishedPage from "../PublishedPage/PublishedPage";
import SolutionPage from "../SolutionPage/SolutionPage";
import TopBar from "../../components/TopBar/TopBar";
import {queryString} from "../../utils/tools";
import {connect} from "dva";
import {Tabs, Layout, Spin} from "antd";
import "./mepage.less";
import MyBreadcrumb from "../../components/MyBreadcrumb/MyBreadcrumb";

const TabPane = Tabs.TabPane;
const {Content} = Layout;

@connect(
  state => ({...state})
)
class MePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    console.log("选中tab:", key);
  }

  componentDidMount() {
    let userId = window.sessionStorage.getItem("user_id");
    //请求我的方案列表
    this.props.dispatch({
      type: "solutions/getMySolutions",
      userId: userId
    });
    //请求我的需求列表
    this.props.dispatch({
      type: "demand/getMyDemands",
      userId: userId
    })
  }

  render() {
    console.log("Me", this.props);
    //我的需求列表
    let myDemandsList = this.props.demand.myDemandList;
    //我的方案列表
    let mySolutionsList = this.props.solutions.solutionsList;
    //默认展示那个tab页面
    let activeTabKey = queryString.parse(this.props.location.search).tab;
    return (
      <div className='me'>
        <TopBar data={this.props.user ? this.props.user.userinfo : {}}/>
        <Header/>
        <MyBreadcrumb/>
          <Content>
            <Tabs defaultActiveKey={activeTabKey ? activeTabKey : "1"} onChange={this.handleClick}>
              <TabPane tab="我发布的需求" key="1">
                <Spin spinning={this.props.loading.models.demand}>
                  <PublishedPage data={myDemandsList}/>
                </Spin>
              </TabPane>              
              <TabPane tab="我提供的解决方案" key="2">
                <Spin spinning={this.props.loading.models.solutions}>
                  <SolutionPage data={mySolutionsList}/>
                </Spin>
              </TabPane>
            </Tabs>
          </Content>
        <Footer/>
      </div>
    )
  }
}

export default MePage;
