import React from "react";
import {Layout,message,Modal} from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MySolutionList from "../../components/SolutionList/MySolutionList";
import WrappedNormalProvideForm from "../../components/ProvideForm/NormalProvideForm";
import {Button} from "antd";
import {PageHeader} from "react-bootstrap";
import MyBreadcrumb from "../../components/MyBreadcrumb/MyBreadcrumb";
import {queryString} from "../../utils/tools";
import "./my-solution-page.less"
import {connect} from "dva";
const ButtonGroup = Button.Group;
const {Content} = Layout;
const confirm = Modal.confirm;


//将服务器代码转换成需求状态
function getSolutionStatus(code) {
  switch (code){
    case 0:
      return '审核中';
    case 1:
      return '已审核';
    default:
      return '审核中'
  }
}

@connect(
  state => ({...state})
)
class MySolutionPage extends React.Component {
  constructor(props){
    super(props);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleDeleteSolution = this.handleDeleteSolution.bind(this);
    this.state = {
      args : queryString.parse(window.location.href),
      viewOnly:'on'
    }
  }

  //修改表单状态为可编辑
  handleEditForm(){
    this.setState({viewOnly:'edit'})
  }

  //根据方案id删除方案
  handleDeleteSolution(solution, e) {
    e.stopPropagation();
    let solutionId = solution.id;
    //弹窗：确定删除执行事件
    function deleteSolution(solutionId) {
      this.props.dispatch({
        type: 'solutions/removeMySolution',
        solutionId: solutionId
      })
      console.log('你要删除' + solutionId + '号方案');
      console.log(solutionId);
      message.success('删除成功');
      this.props.history.push("/me?tab=2");
    }

    //弹窗：取消删除执行事件
    function cancelDelete() {
      message.info('你取消了删除');
    }

    this.showDeleteConfirm(deleteSolution.bind(this, solutionId), cancelDelete);
  }

  //删除全局提示框
  showDeleteConfirm(okFunc, cancelFunc) {
    confirm({
      title: '确定要撤销这条方案吗?',
      content: '撤销后不可恢复',
      okText: '撤销',
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

  componentDidMount(){
    let userId = window.sessionStorage.getItem("user_id");
    if(this.state.args.viewOnly === 'edit'){
      this.setState({viewOnly:'edit'});
    }
    //请求我的方案详情
    this.props.dispatch({
      type: "solutions/fetchSolutionDetail",
      userId: userId,
      reqId:this.state.args.req_id
    });
  }

  render() {
    // console.log("MySolutionPage props",this.props);
    let reqSolution =  this.props.solutions.reqSolution;
    let req = reqSolution.req;      //原需求
    let solution = reqSolution.solution;  //原需求的提供方案
    //方案列表-需求列表
    let solutionList = [];
    req?solutionList[0]=req:null;

    return (
      <div className='my-solution-page'>
        <Header/>
        <MyBreadcrumb/>
        <Content>
          <ButtonGroup style={{float:'right'}}>
            <Button onClick={this.handleEditForm}>修改提案</Button>
            <Button onClick={this.handleDeleteSolution.bind(this,solution)}>撤销提案</Button>
          </ButtonGroup>
          <PageHeader>
            用户需求
          </PageHeader>
          <MySolutionList data={solutionList}/>
          <PageHeader>
            我的提案
            <small style={{marginLeft:10,fontSize:'1rem'}}>{solution?getSolutionStatus(solution.status):''}</small>
          </PageHeader>
          <WrappedNormalProvideForm viewOnly={this.state.viewOnly} reqSolution={reqSolution}/>
        </Content>
        <Footer/>
      </div>
    )
  }
}


export default MySolutionPage;
