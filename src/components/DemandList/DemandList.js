import React from "react";
import "./demand-list.less";
import {withRouter} from "dva/router";
import {connect} from "dva";
import {timeStampToDate} from "../../utils/tools";
import QueueAnim from 'rc-queue-anim';
import {Button, Modal, message, Badge} from "antd";

const confirm = Modal.confirm;

//需求列表组件
const List = ({data, dispatch, viewOnly,page}) => {
  // console.log("List组件:",data);
  return (
    <div className='demand-list'>
      <QueueAnim
        delay={300}
        duration={1000}
        type='bottom'
        appear={true}
        className="queue-simple"
        animConfig={[
          {opacity: [1, 0], translateY: [0, 50]},
          {opacity: [1, 0], translateY: [0, -50]}
        ]}
      >
        {
          data.map((val, idx) => {
            return <ListItem key={idx} index={idx} viewOnly={viewOnly} data={val} dispatch={dispatch} page={page}/>
          })
        }
      </QueueAnim>
    </div>
  )
};

/* 单个需求组件 */
@withRouter
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.jumpToDetail = this.jumpToDetail.bind(this);
    this.handleDeleteReq = this.handleDeleteReq.bind(this);
    this.handleEditReq = this.handleEditReq.bind(this);
  }

  // 跳转到对应需求详情页
  jumpToDetail(req_id) {
    let page = this.props.page;
    if (this.props.viewOnly) {
      this.props.history.push("/me/req?viewOnly=on&page="+page+"&req_id=" + req_id);
    } else {
      this.props.history.push("/detail?page="+page+"&req_id=" + req_id);
    }
  };

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
    }

    //弹窗：取消删除执行事件
    function cancelDelete() {
      message.info('你取消了删除');
    }

    this.showDeleteConfirm(deleteReq.bind(this, reqId), cancelDelete);
  }

  //根据需求id编辑需求
  handleEditReq(reqId, e) {
    e.stopPropagation();
    console.log('你要编辑' + reqId + '号需求');
    Modal.info({
      title: '你要编辑' + reqId + '号需求',
      content: (
        <div>
          <p>编辑功能尚在开发中</p>
          <p>敬请期待...</p>
        </div>
      ),
      onOk() {
      },
    })
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

  render() {
    // console.log("listItem",this.props);
    let data = this.props.data;

    //将服务器代码转换成需求类型
    function getReqType(code) {
      switch (code) {
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

    //将服务器代码转换成需求周期
    function getExceptCycle(code) {
      switch (code) {
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

    //将服务器代码转换成需求状态
    function getReqStatus(code) {
      switch (code) {
        case 0:
          return '审核中';
        case 1:
          return '已审核';
        default:
          return '审核中'
      }
    }

    //badge不同状态的样式
    let styles = {
      pass: {
        backgroundColor: '#52c41a'
      },
      reviewing: {
        backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'
      }
    };

    return (
      <div className="ly-item" onClick={this.jumpToDetail.bind(this, data.id)}>
        <div className='hd demand-abstract clearfix'>
          <h2 className='title'>
            {
              (this.props.location.pathname === "/me") ?
                <span>
                  {data.title}
                  <Badge count={getReqStatus(data.status)} style={data.status == 1 ? styles.pass : styles.reviewing}/>
                </span>
                 :
                <span>{data.title}</span>
            }

            <span className={`type ${this.props.viewOnly ? '' : 'active'}`}
                  style={{float: 'right'}}>{getReqType(data.req_type)}</span>
            {/*<span className={`status ${this.props.viewOnly?'':'active'}`} style={{float: 'right'}}>{getReqStatus(data.status)}</span>*/}

          </h2>
          <span className='price'>￥{data.budget}</span>
          <span className='limit'>需求期限：{getExceptCycle(data.except_cycle)}</span>
        </div>
        <div className='bd demand-info'>
          <p className='desc'>{data.desc}</p>
        </div>
        <div className='ft demand-remark'>
          <span>{data.views} 次浏览</span>
          {/*<span>9 个公司提供方案</span>*/}
          <span>{timeStampToDate(data.created_time * 1000).timeStr}</span>
          {
            this.props.location.pathname === "/me" ?
              (<div className='ly-btn-group'>
                <Button size='small' onClick={this.handleEditReq.bind(this, data.id)}>编辑</Button>
                <Button size='small' type='danger' onClick={this.handleDeleteReq.bind(this, data.id)}>删除</Button>
              </div>) : null
          }

        </div>
      </div>
    );
  }
}


/* 暴露需求列表组件 */
@connect(
  state => ({...state})
)
class DemandList extends React.Component {

  render() {
    const demandList = this.props.demandList ? this.props.demandList : [1, 2, 3, 4];
    return (
      <List data={demandList} {...this.props}/>
    )
  }
}


export default DemandList;
