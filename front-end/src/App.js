// frontend/src/components/App.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added

import history from './history'; // added
import LandingPage from './components/layout/LandingPage'; // added

import PrivateRoute from './components/common/PrivateRoute'; // added
import HeaderMain from './components/layout/Headers';
import RegisterEmployeeForm from "./components/registration/RegisterEmployeePage";
import RegisterEmployerForm from "./components/registration/RegisterEmployerPage";

import { loadUser } from './actions/auth'; // added
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
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
              <LandingPage />
            
           
            </Switch>
          </Content>

        </Router>
      </Provider>
    );
  }
};

export default App;