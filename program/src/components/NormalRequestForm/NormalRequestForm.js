import React from "react";
import {Form, Select, Input, Button, Radio, Upload, Icon, message} from 'antd';
import {fileArr, checkFile} from "../../utils/tools";
import {connect} from "dva";
import {withRouter} from "dva/router"
import "./normal-request-form.less";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

let upload_token = '';  //上传文件到七牛云的token

@withRouter
@connect(
  state => ({...state.upload})
)
class NormalRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      name: "file",
      action: "//up.qiniu.com",
      file: {},
      file_url: ''
    }
    // this.normFile = this.normFile.bind(this);
  }

  //表单提交处理
  handleSubmit(e) {
    e.preventDefault();
    console.log("提交表单", this.state);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.user_id = window.sessionStorage.getItem('user_id');
        values.file_url = this.state.file_url;
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'demand/postDemand',
          payload: values
        });
      //页面跳转到我的页面
        this.props.history.push("/me");
      }
    });
  }

  //表单内容改变处理
  handleSelectChange(value) {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Oh,boy, ${value === 'male' ? 'man' : 'this must Required'}!`,
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
  onChange(info) {
    console.log("文件状态：", info.file);
    if (info.file.status !== 'uploading') {
      // console.log("--",info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      this.setState({file_url: info.file.response.key});
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }

  componentDidMount() {
    // console.log("表单Props", this.props);
    this.props.dispatch({
      type: 'upload/fetch'
    });

  //  上传10条假数据
    /*const fakeData = {
      company: "测试公司",
      desc: "测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情测试内容详情",
      except_cycle: "1",
      file_url: "",
      link_man: "3l先生",
      mobile: "13574488306",
      req_type: "other",
      user_id: window.sessionStorage.getItem('user_id')
    };
    for(let i =0;i<10;i++){
      this.props.dispatch({
        type: 'demand/postDemand',
        payload: {
          ...fakeData,
          title:`这是一条测试需求，编号${i+1}`,
          budget:Math.random()*1000>>0
        }
      });
    }*/

  }

  render() {
    upload_token = this.props.upload_token;
    const {getFieldDecorator} = this.props.form;
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

    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="需求名称"
        >
          {getFieldDecorator('title', {
            rules: [{required: true, message: '请简短描述您的需求!'}],
          })(
            <Input placeholder="简短描述您的需求" style={styles}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="需求类型"
        >
          {getFieldDecorator('req_type', {
            rules: [{required: true, message: '请选择需求类型!'}],
          })(
            <Select
              placeholder="请选择"
              onChange={this.handleSelectChange}
              style={styles}
            >
              <Option value="si">系统集成</Option>
              <Option value="purchase">购买产品</Option>
              <Option value="tech">技术支持</Option>
              <Option value="other">其它</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="需求描述"
        >
          {getFieldDecorator('desc', {
            rules: [{
              required: true, message: '请完善您的需求描述',
            }],
          })(
            <TextArea style={{minHeight: 48}} placeholder="不能低于30个字符[必填]" rows={6}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="希望完成时间"
        >
          {getFieldDecorator('except_cycle')(
            <RadioGroup style={styles}>
              <RadioButton value="1">7天内</RadioButton>
              <RadioButton value="2">1-3个月</RadioButton>
              <RadioButton value="3">3-6个月</RadioButton>
              <RadioButton value="4">6-12个月</RadioButton>
              <RadioButton value="5">1年以上</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="大致预算"
        >
          {getFieldDecorator('budget', {
            rules: [{
              required: true, message: '请输入预算金额',
            }],
          })(
              <Input
                type="number"
                suffix='元'
              />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="需求附件"
          extra={<div style={styles}>仅支持doc,ppt,xls,pdf后缀名文件</div>}
        >
          {getFieldDecorator('file_url', {
            initialValue: this.state.file_url,
          })(
            <Upload
              style={styles}
              name={this.state.name}
              action={this.state.action}
              beforeUpload={this.beforeUpload}
              onChange={this.onChange}
              data={
                {
                  token: this.props.upload_token,
                  key: this.state.file.name
                }
              }
            >
              <Button>
                <Icon type="upload"/> 上传附件
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          {getFieldDecorator('link_man', {
            rules: [{required: true, message: '请完善联系人姓名!'}],
          })(
            <Input placeholder="不低于2个字符" style={styles}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司名称"
        >
          {getFieldDecorator('company', {
            rules: [{required: true, message: '请完善公司名称!'}],
          })(
            <Input placeholder="不低于3个字符" style={styles}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: '请完善联系电话!'}],
          })(
            <Input style={styles}/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{span: 12, offset: 3}}
        >
          <Button type="primary" htmlType="submit" style={styles}>
            提交审核
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalRequestForm = Form.create()(NormalRequestForm);

export default WrappedNormalRequestForm;

