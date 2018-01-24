import React from "react";
import DemandList from "../../components/DemandList/DemandList";
import TipPanel from "../../components/TipPanel/TipPanel";

class PublishedPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    // console.log("我发布的需求页面",this.props);
    let myDemandList = this.props.data;
    return(
      <div>
        {
          myDemandList.length<1?
            <TipPanel
              tip="您还没有发布过需求"
              component={<a href='#/publish'>去发布</a>}
            />:
            <DemandList viewOnly={true} demandList={myDemandList} />
        }

      </div>
    )
  }
}

export default PublishedPage;
