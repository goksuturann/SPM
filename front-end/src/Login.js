import logo from './logo.svg';
import axios from 'axios';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Table, Layout, Button, Input,Checkbox ,Form} from 'antd';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;

const { TextArea } = Input;



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


class LogInPage extends Component{
  constructor(props){
    super(props);
    this.state={
      is_loading: false,
      user: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
   
  }
  

  


  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.user === null || this.state.user === "") {
      alert("no usename was entered!");
    } else {
      alert('name submitted, fetching user ' + this.state.user);

      const response = await axios.post("http://localhost:8000/users/post_user/",
        {
          method: 'POST',
          body: JSON.stringify({
            username: this.state.user,
            // Other body stuff
          }),
          headers: {
            'Content-Type': 'application/json'
            // Other possible headers
          }
        }
      );
      const responseJson = response["data"];
      if (responseJson['status'] === 'OK') {
        alert("Success");
        this.setState({ is_log_in: false, is_mail_list: true, is_mail_send: false });
        //console.log(this.state.is_mail_list);
        this.go_to_mail_list();
      }
      else {
        alert("Invalid user");
        this.setState({ user: "", is_log_in: true });
      }
    }
  }

  handleChangeUser(event) {
    if (event.target.value !== "" || event.target.value !== null) {
      this.setState({ user: event.target.value });
    }
    else {
      alert("no username was entered!");
    }
  }


  render() {
    return (
      <Form
        className="centered"
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={this.handleChangeUser}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default LogInPage;
