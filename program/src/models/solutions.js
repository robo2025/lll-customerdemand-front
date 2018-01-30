import {getAllSolutions,getMySolutionDetail,postSolution,deleteMySolution} from "../services/solutions";
import { Modal} from 'antd';

export default {
  namespace: 'solutions',

  state: {
    solutionsList: [],
    reqSolution:{},
    res:{
      code: '',
      msg: ''
    },
  },

  effects: {
    *getMySolutions({userId}, {call, put}) {
      console.log("用户id",userId)
      const response = yield call(getAllSolutions,userId);
      yield put({
        type: 'saveAll',
        payload: response,
      });
    },
    *fetchSolutionDetail({userId,reqId},{call,put}){
      const response = yield call(getMySolutionDetail,userId,reqId);
      console.log("获取方案详情数据",response);
      yield put({
        type: 'saveDetail',
        payload: response,
      });
    },
    *postSolution({payload},{call,put}){
      yield put({
        type: 'save',
        response:{rescode:'',msg:''}
      })
      const response = yield call(postSolution,payload);
      console.log("提交方案相应",response);
      yield put({
        type: 'save',
        response:response
      })
    },
    *removeMySolution({solutionId},{call,put}){
      const response = yield call(deleteMySolution,solutionId);
      yield put({
        type: 'removeSolution',
        solutionId:solutionId
      })
    }
  },

  reducers: {
    save(state,action){
      console.log("reducer action:",action);
      return {
        ...state,
        res:{code:action.response.rescode,msg:action.response.msg}
      };
    },
    saveAll(state, action) {
      return {
        ...state,
        solutionsList: [...action.payload.data],
      };
    },
    saveDetail(state,action){
      return {
        ...state,
        reqSolution: {...action.payload.data},
      };
    },
    removeSolution(state,action){
      return {
        ...state,
        solutionsList:state.solutionsList.filter((val)=>{
          return val.solution_id !== action.solutionId>>0;
        })
      }
    }
  }
}
