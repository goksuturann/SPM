// frontend/src/components/auth/RegisterForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  
import { register } from '../../actions/auth';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class RegisterEmployeeForm extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: false
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  onSubmit = formValues => {
    this.props.register(formValues, "employee");
  };

  

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
      <h1 style={{marginLeft:"5vh"}}>Register as an Employee</h1>
      
      <Col flex>
      
        <Form
          style={{ marginRight:"10vh", padding:"5vh 5vh 5vh 5vh" }}
          {...formItemLayout}
          name="register"
          onFinish={values => this.onSubmit(values)}
          scrollToFirstError
        >
          <Form.Item
           name="profilepic"
           label="Profile Photo"
           rules={[
            {
              required: true,
              message: 'Please input your name!',
            }
          ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                type: 'name',
                message: 'The input is not valid name!',
              },
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Please input your surname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
    
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="username"
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want to be called as?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        </Col>
        </div>
      );
   }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterEmployeeForm = connect(
  mapStateToProps,
  { register }
)(RegisterEmployeeForm);

export default reduxForm({
  form: 'registerForm'
})(RegisterEmployeeForm);