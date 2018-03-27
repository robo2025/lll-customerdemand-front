import React from 'react';
import Cookies from 'js-cookie';
import { connect } from 'dva';
import { HOME_PAGE } from '../../constant/config';
import { verifyLogin } from '../../utils/tools';

@connect(state => ({
  ...state,
}))
class Test extends React.Component {
  componentDidMount() {
    console.log('测试页面加载好了!');
    verifyLogin();
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      success: (res) => {
        Cookies.set('userinfo', JSON.stringify(res.data), { expires: 7 });
        const nextUrl = window.localStorage.getItem('nextUrl'); // 从localStorage读取跳转url
        window.location.href = nextUrl || HOME_PAGE;
      },
    });
  }

  render() {
    return (
      <div>跳转中...</div>
    );
  }
}

export default Test;
