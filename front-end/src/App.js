import logo from './logo.svg';
import axios from 'axios';
import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Table, Layout, Button, Input } from 'antd';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;
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
      <Layout>
        <Header >Enter your username to check your mails!</Header>
        <div class="centered" >
          <form onSubmit={this.handleSubmit} >
            <label>
              Username:
              <Input type="text" value={this.state.user} onChange={this.handleChangeUser} />
            </label>

            <Button htmlType="submit">
              Submit
            </Button>
          </form>
        </div >
      <Footer/>
      </Layout>
    );
  }
}

export default LogInPage;
