
export default {

  namespace: 'example',

  state: {
    test:1,
    test2:2
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      console.log(state,action);
      return { ...state, ...action.payload };
    },
  },

};
