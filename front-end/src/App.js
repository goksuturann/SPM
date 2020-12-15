// frontend/src/components/App.js
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store';
import { Router, Route, Switch } from 'react-router-dom'; // added

import history from './history'; // added
import LoginForm from './components/auth/LoginFrom'; // added
import PrivateRoute from './components/common/PrivateRoute'; // added
import Header from './components/layout/Headers';
import { loadUser } from './actions/auth'; // added

class App extends Component {
  // added
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            {//<PrivateRoute exact path='/' component={Dashboard} /> 
            }
            <Route exact path='/login' component={LoginForm} /> 
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;