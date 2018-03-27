import { Pagination, Spin } from 'antd';
import { connect } from 'dva';
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DemandList from '../../components/DemandList/DemandList';
import MyBreadcrumb from '../../components/MyBreadcrumb/MyBreadcrumb';
import './home-page.less';


@connect(({ demand, loading }) => ({
  demand,
  loading,
})
)
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.pageChange = this.pageChange.bind(this);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    // console.log(this.props);
    /* this.props.dispatch({
           type:'user/fetch'
     }) */
  }

  pageChange(page, pageSize) {
    console.log(page, pageSize);
    this.props.history.push('/?page=' + page);
    this.setState({ page });
    this.props.dispatch({
      type: 'demand/getAllDemands',
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
  }

  render() {
    const { demand, loading } = this.props;
    const { demandList, total } = demand;

    return (
      <div className="home-page">
        <Spin spinning={loading.models.demand} size="large">
          <Header />
          <MyBreadcrumb />
          <DemandList demandList={demandList} page={this.state.page} />
          <Pagination
            defaultCurrent={1}
            defaultPageSize={15}
            total={total}
            onChange={this.pageChange}
          />
          <Footer />
        </Spin>
      </div>
    );
  }
}

export default HomePage;
