import React from "react";
import {Layout, Button, message, Modal,Spin} from "antd";
import {Panel} from "../../components/Panel/Panel";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SolutionList from "../../components/SolutionList/SolutionList";
import MyBreadcrumb from "../../components/MyBreadcrumb/MyBreadcrumb";
import TopBar from "../../components/TopBar/TopBar";
import {withRouter} from "dva/router";
import {queryString} from "../../utils/tools";
import {connect} from "dva";
import "./detail-page.less";

const confirm = Modal.confirm;
const {Content} = Layout;
const ButtonGroup = Button.Group;

@withRouter
@connect(
  state => ({...state})
)
class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditReq = this.handleEditForm.bind(this);
    this.handleDeleteReq = this.handleDeleteReq.bind(this);
    this.state = {
      args: queryString.parse(window.location.href)
    }
  }

  //编辑需求
  handleEditForm(reqId) {
    Modal.info({
      title: '你要编辑'+reqId+'号需求',
      content: (
        <div>
          <p>编辑功能尚在开发中</p>
          <p>敬请期待...</p>
        </div>
      ),
      onOk() {},
    })
  }

  //修改需求
  //根据需求id删除需求
  handleDeleteReq(reqId, e) {
    e.stopPropagation();

    //弹窗：确定删除执行事件
    function deleteReq(reqId) {
      this.props.dispatch({
        type: 'demand/deleteDemand',
        reqId: reqId
      })
      console.log('你要删除' + reqId + '号需求');
      message.success('删除成功');
      this.props.history.push("/me");
    }

    //弹窗：取消删除执行事件
    function cancelDelete() {
      message.info('你取消了删除');
    }

    this.showDeleteConfirm(deleteReq.bind(this, reqId), cancelDelete);
  }

  //删除全局提示框
  showDeleteConfirm(okFunc, cancelFunc) {
    confirm({
      title: '确定要删除这条需求吗?',
      content: '删除后不可恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        okFunc();
      },
      onCancel() {
        cancelFunc();
      },
    });
  }


  componentDidMount() {
    // console.log("详情页面渲染好了--", this.state, this.props);
    let userId = window.sessionStorage.getItem("user_id");
    //从服务器获取我的需求列表
    //请求需求详情
    this.props.dispatch({
      type:"demand/fetchDemandDetail",
      reqId:this.state.args.req_id
    });


    if (this.state.args.viewOnly === 'on') {
      //请求解决方案
      this.props.dispatch({
        type: "me/saveSolutions",
        reqId: this.state.args.req_id
      })
    }

  }

  render() {
    let args = this.state.args;
    let routeLoading = this.props.loading.models.demand;
    // console.log("详情页", routeLoading);    
    return (
      <div className='detail-page'>
        <TopBar/>
        <Header/>
        <MyBreadcrumb/>
        <Spin spinning={routeLoading}>
          <Content className='req-content'>
            {
              this.props.match.path === '/me/req' ?
                <ButtonGroup style={{float: 'right'}}>
                  <Button onClick={this.handleEditReq.bind(this,args.req_id)}>修改需求</Button>
                  <Button onClick={this.handleDeleteReq.bind(this,args.req_id)}>撤销需求</Button>
                </ButtonGroup> : null
            }
            <Panel reqId={args.req_id} data={this.props.demand.detail}/>
          </Content>
        </Spin>
        {
          this.props.match.path === '/me/req' ?
            <Content className='solution-content'>
              <div className='solutions-wrap'>
                <h2 className='title'>已提供方案列表</h2>
                <SolutionList data={this.props.me.reqSolutions}/>
              </div>
            </Content>
            :
            null
        }
        <Footer/>
      </div>
    )
  }
}

export default DetailPage;
