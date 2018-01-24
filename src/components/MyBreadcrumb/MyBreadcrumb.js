import React from "react";
import {Breadcrumb} from "antd";
import {withRouter} from "dva/router";
import {routeConfig} from "../../constant/routeConfig";
import "./my-breadcrumb.less";

@withRouter
class MyBreadcrumb extends React.Component{

  render(){
    let path = this.props.match.path;
    let pathArr = path.match(/\/[a-z]*/gi);
    let str = '#';
    // console.log("面包屑路径：",path,pathArr);
    return(
      <div className='bread-wrap'>
        <Breadcrumb>
          {
            path!=='/'?<Breadcrumb.Item ><a href={'#/'}>{routeConfig["/"]}</a></Breadcrumb.Item>:null
          }
          {
            pathArr.map((val,idx)=>{
                str+=val;
              return (<Breadcrumb.Item key={idx}>
                <a href={str}>{routeConfig[val]}</a>
              </Breadcrumb.Item>
              )
            })
          }
         {/* <Breadcrumb.Item><a href={path}>{routeConfig[path]}</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href={'#/me'}>列表</a></Breadcrumb.Item>
          <Breadcrumb.Item>编辑</Breadcrumb.Item>*/}
        </Breadcrumb>
      </div>
    )
  }
}

export default MyBreadcrumb;
