import React from "react";
import Cookies from 'js-cookie';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyBreadcrumb from "../../components/MyBreadcrumb/MyBreadcrumb";
import WrappedNormalRequestForm from "../../components/NormalRequestForm/NormalRequestForm";
import {Steps, Popover} from 'antd';
import {connect} from "dva";
import TopBar from "../../components/TopBar/TopBar";
import {login} from '../../services/user';
const Step = Steps.Step;


const customDot = (dot, {status, index ,title}) => (
  <Popover content={<span>第{index+1}步 : {title}</span>}>
    {dot}
  </Popover>
);


//发布页面
@connect(
  state=>({user:state.user,demandList:state.demandList})
)
class PublishPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // console.log("props",this.props);
    if(!Cookies.get('access_token')){
      login();
    }
  }

  render() {
    console.log("PublishPage",this.props);
    return (
      <div>
        <TopBar/>
        <Header/>
        <MyBreadcrumb/>
        <div className='ly-container'>
          <Steps current={0} size='small' style={{maxWidth:1000,margin:'0 auto'}}>
            <Step title="发布需求"/>
            <Step title="平台审核需求"/>
            <Step title="发布成功"/>
            <Step title="选择服务商家方案"/>
          </Steps>
          <WrappedNormalRequestForm/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default PublishPage;
