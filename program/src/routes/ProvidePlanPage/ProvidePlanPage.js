import React from 'react';
import { Layout, message } from 'antd';
import { connect } from 'dva';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { PanelHeader } from '../../components/Panel/Panel';
import MyBreadcrumb from '../../components/MyBreadcrumb/MyBreadcrumb';
import WrappedNormalProvideForm from '../../components/ProvideForm/NormalProvideForm';
import { queryString, handleServerMsgObj } from '../../utils/tools';
import './provide-plan-page.less';

const { Content } = Layout;

@connect(({ demand, solutions, me, loading, upload }) => ({
  demand,
  solutions,
  me,
  upload,
  loading,
})
)
class ProvidePlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: queryString.parse(window.location.href),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { args } = this.state;
    dispatch({
      type: 'upload/fetch',
    });
    dispatch({
      type: 'demand/fetchDemandDetail',
      reqId: args.req_id,
    });
  }

  // 提交方案
  handleSubmitSolution = (values) => {
    this.props.dispatch({
      type: 'solutions/postSolution',
      payload: values,
      success: () => {
        message.success('方案提交成功', 1, () => {
          this.props.history.push('/me?tab=2');
        });
      },
      error: (res) => { message.error(handleServerMsgObj(res.msg)); },
    });
  }

  render() {
    const { args } = this.state;
    const { demand, upload } = this.props;
    const { demandList, detail } = demand;
    const currReqData = demandList.filter((val) => {
      return val.id == args.req_id;
    });
    // console.log("ProvidePlanPage：",this.props);

    return (
      <div className="provide-plan-page">
        <Header />
        <MyBreadcrumb />
        <Content>
          <div className="ly-panel">
            <PanelHeader data={detail} />
          </div>
          <WrappedNormalProvideForm
            uploadToken={upload.upload_token}
            onSubmit={this.handleSubmitSolution}
            {...args}
            {...this.props}
            data={this.props.me.myReqSolution}
          />
        </Content>
        <Footer />
      </div>
    );
  }
}

export default ProvidePlanPage;
