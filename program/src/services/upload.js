import axios from "axios";
import {URL1} from "../constant/config"

export async function query(params) {
  return axios({
    method: 'get',
    url: URL1 + '/qiniu/upload_token',
  }).then((response) => {
    const {status,statusText} = response;
    // console.log("获取token服务器返回数据：",response);
    return Promise.resolve({
      status,
      statusText,
      upload_token:response.data
    })
  })
}
