import {query,logout} from "../services/user";

export default {
  namespace: 'user',

  state:{
    user1:{a:1,b:2},
    userinfo:{}
  },

  effects: {
    *fetch(_,{call,put}){
      const response = yield call(query);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      window.sessionStorage.setItem('user_id',`${action.payload.data.id}`);
      return {
        ...state,
        userinfo: action.payload.data,
      };
    },
  }
}
