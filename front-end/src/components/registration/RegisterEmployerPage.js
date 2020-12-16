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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
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

class RegisterEmployerForm extends Component {
  

  onSubmit = formValues => {
    this.props.register(formValues, "employer");
  };

  

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
        <Form
          {...formItemLayout}
          name="register"
          onFinish={values => this.onSubmit(values)}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
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
            name="nickname"
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>
    
          
    
          <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
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
      );
   }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterEmployerForm = connect(
  mapStateToProps,
  { register }
)(RegisterEmployerForm);

export default reduxForm({
  form: 'registerForm'
})(RegisterEmployerForm);