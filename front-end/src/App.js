// frontend/src/components/App.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added
import spm_logo from './spm_logo.jpeg';

import history from './history'; // added
import LandingPage from './components/layout/LandingPage'; // added
import PostJobForm from './components/jobs/PostingJobPage';
import HomePage from './main/HomePage';
import ViewJobPage from './components/jobs/ViewJobPage'
import ProfilePage from './main/ProfilePage'
import HomePageEmployee from './main/HomePageEmployee'

import PrivateRoute from './components/common/PrivateRoute'; // added
import HeaderMain from './components/layout/Headers';
import RegisterEmployeeForm from "./components/registration/RegisterEmployeePage";
import RegisterEmployerForm from "./components/registration/RegisterEmployerPage";

import { loadUser} from './actions/auth'; // added
import './App.css';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import LogoutButton from './main/LogoutButton';
const { Header, Content, Footer } = Layout;

class App extends Component {
  

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>

          <Header> <HeaderMain /> </Header>

          <Content >
            <Switch>
            <Route path='/register_employee'>
                <RegisterEmployeeForm/>
            </Route> 
            <Route path='/register_employer'>
                <RegisterEmployerForm/>
            </Route> 
            <Route path='/post_job'>
                <PostJobForm/>
            </Route> 
            <Route path='/home'>
                <HomePage/>
            </Route> 
            <Route path='/view_jobs'>
                <ViewJobPage/>
            </Route>
            <Route path='/profile'>
                <ProfilePage/>
            </Route>
            <Route path='/home_employee'>
                <HomePageEmployee/>
            </Route>
              <LandingPage />
            </Switch>
          </Content>
          <Footer className='App-footer' style={{ textAlign: 'center'}}>
            <div className='img-container'>İŞ ÇOK BAŞVURU ÇOK</div>
            <div style={{ float: 'right'}}><LogoutButton/></div>
          </Footer>
        </Router>
      </Provider>
    );
  }
};

export default App;