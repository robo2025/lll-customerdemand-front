import React from "react";
import {Form, Select, Input, Button, Radio, Upload, Icon, message, Modal} from 'antd';
import {connect} from "dva";
import {withRouter} from "dva/router";
import "./normal-provide-form.less";
import {checkFile, fileArr} from "../../utils/tools";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@withRouter
@connect(
  state => ({
    solutionsList: state.solutions.solutionsList, 
    ...state.upload, 
    reqSolutions: state.me.reqSolutions,
    res:state.solutions.res,
    roteLoading:state.loading.models.solutions,
  })
)
class NormalProvideForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "file",
      title: '',
      desc: '',
      file_url: '',
      action: "//up.qiniu.com",
      file: {},
      fileList:[],
      isSubmit:false
    }
  }

  componentWillUpdate(nextProps,nextState){
    console.log('nextprops',nextProps,nextState);
    if(!nextProps.res.code || !this.state.isSubmit){
      return;
    }else if(nextProps.res.code === '10000'){
       //页面跳转
        this.props.history.push("/me?tab=2");
    }else{
      Modal.error({
        title: '错误信息',
        content: nextProps.res.msg.split(":")[1],
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let user_id = window.sessionStorage.getItem("user_id"); //用户id
    let req_id = this.props.req_id;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values["user_id"] = user_id;
        values["req_id"] = req_id;
        values["file_url"] = this.state.file_url;
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: "solutions/postSolution",
          payload: values
        });

        this.setState({isSubmit:true})
      }
    });
  }

  handleSelectChange(value) {
    // console.log("-------",value);
    this.props.form.setFieldsValue({
      desc: value,
    });
  }

  //上传文件ina处理验证文件类型
  beforeUpload(file) {
    // console.log("文件类型",file.type, file);
    this.setState({file: file});
    if (!checkFile(file.name, fileArr)) {
      message.error(`${file.name} 暂不支持上传`);
      return false;
    }
  }

  //上传文件状态改变时处理
  handleChange(info) {
    let fileList = info.fileList;
    // 1. Limit the number of uploaded files
    fileList = fileList.slice(-1);
    // 2. read from response and show file link
    const _this = this;
    fileList = fileList.map((file) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
        _this.setState({file_url: info.file.response.key});
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
      return file;
    });
    this.setState({fileList});
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.reqSolution) {
      let solution_id = this.props.solution_id; //方案id
      let req_id = this.props.req_id; //需求id
      // console.log("0---------",nextProps);
      let currSolution = nextProps.reqSolution.solution;
      currSolution ? currSolution : currSolution = nextProps["data"];
      // console.log("当前方案：", currSolution, nextProps);
      let currSolutionTitle = currSolution ? currSolution.title : '';   //方案标题
      this.setState({title: currSolutionTitle});
      let currSolutionDesc = currSolution ? currSolution.desc : ''; //方案描述
      if(currSolutionDesc){
        console.log('方案描述',currSolutionDesc);    
        // this.handleSelectChange(currSolutionDesc);        
      }
      // this.handleSelectChange(currSolutionDesc);      
      this.setState({desc: currSolutionDesc});
      let file_url = currSolution ? currSolution.file_url : '';   //方案url
      this.setState({file_url: file_url});
      // console.log("当前方an",currSolution);
    }
  }

  componentDidMount() {

    // 改变方案描述内容
    let _this = this;
    let showContent = (this.props.viewOnly === 'on' || this.props.viewOnly === 'edit');  //是否填充内容
    // console.log("表单Props", this.props);
    this.props.dispatch({
      type: 'upload/fetch'
    })

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const viewOnly = (this.props.viewOnly === 'on');  //是否仅可读
    const showContent = (this.props.viewOnly === 'on' || this.props.viewOnly === 'edit');  //是否填充内容
    const inputStyle = (this.props.viewOnly === 'on') ? {readOnly: true} : {}; //可读状态将input设置不可写
    const style2 = (this.props.viewOnly === 'on') ? {border: 'none', borderRadius: 0, minHeight: 'auto'} : {};

    console.log("发布需求页面props",this.props);
    
    const formItemLayout = {
      labelCol: {
        xs: {span: 5},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 19},
      },
    };
    const styles = {
      ...style2
    };


    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="方案名称"
        >
          {getFieldDecorator('title', {
            rules: [{required: true, message: '请简短描述您的需求!'}],
            initialValue: showContent ? this.state.title : ''
          })(
            <Input placeholder="简短描述您的需求" style={styles} {...inputStyle}/>
          )}
        </FormItem>
        {
          viewOnly ?
            <FormItem
              {...formItemLayout}
              label="方案描述"
            >
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '请完善您的需求描述',
                }],
                initialValue: showContent ? this.state.desc : ''
              })(
                <Input style={styles} {...inputStyle}/>
              )}
            </FormItem>
            :
            <FormItem
              {...formItemLayout}
              label="方案描述"
            >
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '请完善您的需求描述',
                }],
                initialValue: showContent ? this.state.desc : ''
              })(
                <TextArea style={{minHeight: 48, ...styles}} rows={6} {...inputStyle}/>
              )}
            </FormItem>
        }
        {
          viewOnly ?
            <FormItem
              {...formItemLayout}
              label="方案附件"
            >
              {getFieldDecorator('file_url', {})(
                <div style={styles}>
                  <Icon type="file-word"/>
                  {this.state.file_url
                    ?
                    <a href={this.state.file_url}>{this.state.file_url}</a> :
                    '无'
                  }
                </div>
              )}
            </FormItem>
            :
            <FormItem
              {...formItemLayout}
              label="方案附件"
              extra={<div style={styles}>仅支持doc,ppt,xls,pdf后缀名文件</div>}
            >
              {getFieldDecorator('file_url', {
                initialValue: ''
              })(
                <Upload
                  style={styles}
                  name={this.state.name}
                  action={this.state.action}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  fileList={this.state.fileList}
                  data={
                    {
                      token: this.props.upload_token,
                      key: `/solution/${this.state.file.lastModified}-ly-${this.state.file.name}`
                    }
                  }
                >
                  <Button>
                    <Icon type="upload"/> 上传附件
                  </Button>
                </Upload>
              )}
            </FormItem>
        }
        {
          viewOnly ?
            null :
            <FormItem
              wrapperCol={{
                xs: {span: 12, offset: 0},
                sm: {span: 12, offset: 3},
                md: {span: 12, offset: 3},
              }}
            >
              <Button type="primary" htmlType="submit" style={styles} loading={this.props.roteLoading}>
                提交审核
              </Button>
            </FormItem>
        }
      </Form>
    );
  }
}

const WrappedNormalProvideForm = Form.create()(NormalProvideForm);

export default WrappedNormalProvideForm;

