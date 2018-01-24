import React from "react";
import "./panel.less";
import {Button} from 'antd';
import {withRouter} from "dva/router";
import {queryString,timeStampToDate} from "../../utils/tools";
import {connect} from "dva";

function getReqType(code) {
  switch (code){
    case 'si':
      return '系统集成';
    case 'purchase':
      return '产品购买';
    case 'tech':
      return '技术支持';
    case 'other':
      return '其它';
    default:
      return '其它类型'
  }
}
function getExceptCycle(code) {
  switch (code){
    case 1:
      return '7天内';
    case 2:
      return '1~3月';
    case 3:
      return '3~6月';
    case 4:
      return '6~12月';
    case 5:
      return '一年以上';
    default:
      return '不限时间'
  }
}

@withRouter
@connect(
  state=>({demandList:state.demand.demandList,myDemandList:state.demand.myDemandList})
)
export class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let args = queryString.parse(window.location.href);
    let currReqData = this.props.data;
    console.log("Panel",currReqData);
    return (
      <div className='ly-panel'>
        <PanelHeader data={currReqData}/>
        <PanelBody data={currReqData}/>
        {
          args.viewOnly === "on" ?
            null
            :
            <Button className='absolute' onClick={() => {
              this.props.history.push("provide?page="+args.page+"&req_id="+this.props.reqId);
            }}>我要提方案</Button>
        }

      </div>
    )
  }
}

export const PanelHeader = ({data}) => (
  data?
    (<div className='panel-header'>
    <h2>{data.title}</h2>
    <ul className='list-info'>
      <li className='budget'><b>预算</b>：￥{data.budget}</li>
      <li className='duration'><b>需求期限</b>：{getExceptCycle(data.except_cycle)}</li>
      <li className='type'><b>需求类型</b>：{getReqType(data.req_type)}</li>
    </ul>
    <div className='panel-extra'>
      <span>{data.views}次浏览</span>
      {/*<span>8公司提供方案</span>*/}
      <span>发布时间：{timeStampToDate(data.created_time*1000).timeStr}</span>
    </div>
  </div>)
    :null
);

export const PanelBody = ({data}) => (
  data?
    (<div className='panel-body'>
    <h2>需求描述</h2>
    <p>
      {data.desc}
    </p>
  </div>)
    :null
);
