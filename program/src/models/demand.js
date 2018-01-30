import {postDemand,getAllDemand,getMyDemand,removeDemand,getDemandDetail} from "../services/demand";

export default {
  namespace: 'demand',

  state:{
    demandList:[],
    myDemandList:[],
    total:0,
    offset:0,
    limit:15,
    detail:{},
    res:{
      code: '',
      msg: ''
    },
  },

  effects: {
    *postDemand({payload},{call,put}){
      yield put({
        type: 'save',
        response:{rescode:'',msg:''}
      })
      const response = yield call(postDemand,payload);
      yield put({
        type: 'save',
        response:response
      })
    },
    *fetchDemandDetail({reqId},{call,put}){
      console.log("fetchDemandDetail",reqId)
      const response = yield call(getDemandDetail,reqId);
      yield put({
        type: 'saveDetail',
        payload: response
      });
    },
    *getAllDemands({offset,limit},{call,put}){
      const response = yield call(getAllDemand,offset,limit);
      // console.log("model所有需求响应:",response);
      yield put({
        type: 'saveAll',
        payload: response,
        offset:offset,
        limit:limit
      });
    },
    *getMyDemands({userId},{call,put}){
      const response = yield call(getMyDemand,userId);
      yield put({
        type: 'saveMyDemands',
        payload: response,
      });
    },
    *deleteDemand({reqId},{call,put}){
      const response = yield call(removeDemand,reqId);
      if(response.rescode==='10000'){
        yield put({
          type: 'deleteMyDemand',
          reqId: reqId,
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        res:{code:action.response.rescode,msg:action.response.msg}
      };
    },
    saveAll(state, action) {
      return {
        ...state,
        demandList: [...action.payload.data],
        total:action.payload.headers["x-content-total"]>>0,
        offset:action.offset>>0,
        limit:action.limit>>0
      };
    },
    saveMyDemands(state,action){
      return {
        ...state,
        myDemandList:[...action.payload.data],
      }
    },
    deleteMyDemand(state,action){
      return {
        ...state,
        myDemandList:state.myDemandList.filter((val)=>{
          return val.id !== action.reqId>>0;
        })
      }
    },
    saveDetail(state,action){
      return{
        ...state,
        detail:action.payload.data
      }
    }
  }
}
