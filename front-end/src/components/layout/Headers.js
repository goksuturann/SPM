// frontend/src/components/layout/Headers.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
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
    const guestLinks = (
        <Link to='/register_employee' className='item'>
          <Button>Register</Button>
        </Link>    
    );

    // updated
    //TODO IS USER EMPLYOER???
    return (
      <div className='ui inverted menu' style={{ borderRadius: '0' }}>
        <Link to='/home' className='item'>
          <Button>Home</Button>
        </Link>
        {user && jobPostLink}
        {!isAuthenticated && guestLinks}
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
  mapStateToProps
)(HeaderMain);