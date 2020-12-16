// frontend/src/components/App.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added

import history from './history'; // added
import LoginFormEmployee from './components/auth/LoginFormEmployee'; // added
import LoginFormEmployer from './components/auth/LoginFormEmployer'; // added
import LandingPage from './components/layout/LandingPage'; // added

import PrivateRoute from './components/common/PrivateRoute'; // added
import HeaderMain from './components/layout/Headers';
import { loadUser } from './actions/auth'; // added
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Card, Col, Row, Button } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  // added
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
            <LandingPage/>
            </Switch>
          </Content>

        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default App;