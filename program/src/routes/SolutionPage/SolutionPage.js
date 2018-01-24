import React from "react";
import { Card } from 'antd';
import TipPanel from "../../components/TipPanel/TipPanel";
import MySolutionList from "../../components/SolutionList/MySolutionList"
import {withRouter} from "dva/router";
import "./solution.less"


class SolutionPage extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    let data = this.props.data;

    //将服务器代码转换成需求状态
    function getReqStatus(code) {
      switch (code){
        case 0:
          return '审核中';
        case 1:
          return '已审核';
        default:
          return '审核中'
      }
    }
    // console.log("SolutionPage:",data);
    return(
      <div className='solution-box'>
        {
          data.length<1?
            <TipPanel tip="您还没有提交过方案"/>:
            <MySolutionList data={data} viewOnly={true} />
        }
      </div>
    )
  }
}

@withRouter
export class More extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    this.props.history.push(`/provide?viewOnly=on&req_id=${this.props.req_id}&solution_id=${this.props.solution_id}`);
  }

  render(){
    return(
     <a href="#" onClick={this.handleClick} className='more'>详情</a>
    )
  }
}

export default SolutionPage;
