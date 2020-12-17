import React, { Component } from 'react';
import { logout } from '../actions/auth';
import {Button} from 'antd';
import { connect } from 'react-redux'; // added
import {Link} from 'react-router-dom';

const userLinks = (
    <Link to='/'>
         <Button onClick={logout}>
            Logout
        </Button>
    </Link>
);

class LogoutButton extends Component { 
    render(){
        if(this.props.auth.isAuthenticated)
            return userLinks;
        return null;
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});
  
// updated
export default connect(
    mapStateToProps,
    {logout}
)(LogoutButton);