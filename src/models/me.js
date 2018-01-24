import {getSolutions,getMyReqSolution} from "../services/mycenter";

export default {
  namespace: 'me',

  state:{
    reqSolutions:[],
    myReqSolution:{}
  },

  effects: {
    *saveSolutions({reqId},{call,put}){
      const response = yield call(getSolutions,reqId);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchMyReqSolution({reqId,solutionId},{call,put}){
      const response = yield call(getMyReqSolution,reqId,solutionId);
      yield put({
        type: 'saveMyReqSolution',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        reqSolutions: action.payload.data,
      };
    },
    saveMyReqSolution(state,action){
      return {
        ...state,
        myReqSolution:action.payload.data
      }
    }
  }
}
