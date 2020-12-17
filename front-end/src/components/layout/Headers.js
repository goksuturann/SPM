// frontend/src/components/layout/Headers.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { logout } from '../../actions/auth'; // added
import { Menu, Dropdown, Row, Col, Card,Button } from 'antd';
import "./Layout.css";
class HeaderMain extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth; // added

    const jobPostLink = (
      <Link to='/post_job' className='item'>
          <Button>Post Job</Button>
        </Link> 
    );
    
    // added
    //TODO add job post link
    const userLinks = (
      <div className='right menu'>
        <div className='ui simple dropdown item'>
          {user ? user.username : ''}
          <i className='dropdown icon' />
          <ul>
            <div className='menu'>
              <a onClick={this.props.logout} className='item'>
                Logout
              </a>
            </div>
          </ul>
        </div>
      </div>
    );

    // added
    const guestLinks = (

        <Link to='/register_employee' className='item'>
          <Button>register</Button>
        </Link>    
        );

    // updated
    return (
      <div className='ui inverted menu' style={{ borderRadius: '0' }}>
        <Link to='/' className='item'>
          <Button>Home</Button>
          {user && jobPostLink}
        </Link>
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    );
  }
}

// added
const mapStateToProps = state => ({
  auth: state.auth
});

// updated
export default connect(
  mapStateToProps,
  { logout }
)(HeaderMain);