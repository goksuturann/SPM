// frontend/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';
import 'antd/dist/antd.css';

import { Table, Layout, Button, Input,Checkbox ,Form} from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { TextArea } = Input;
class LoginForm extends Component {
  
  

  onSubmit = formValues => {
    console.log(formValues);
    this.props.login(formValues, "employer");
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => this.props.handleSubmit(this.onSubmit(values))}
            onFinishFailed={null}
          >
            <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>

        <Button type="primary" htmlType="submit">
            Login
          </Button>
          </Form.Item>
          </Form>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);