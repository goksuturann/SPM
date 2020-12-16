

import React, { Component } from 'react';
import { Link,Redirect,Route } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added

import { Layout, Menu, Breadcrumb } from 'antd';
import LoginFormEmployee from '../auth/LoginFormEmployee'; // added
import LoginFormEmployer from '../auth/LoginFormEmployer'; // added
import RegisterEmployeePage from '../registration/RegisterEmployeePage'; // added

import { Card, Col, Row, Button } from 'antd';



class LandingPage extends Component {

    render() {

        const { user, isAuthenticated } = this.props.auth; // added
        if (isAuthenticated) {
            return <Redirect to='/' />;
          }
        return(
        <div className="site-card-wrapper">
            <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify="center" align="middle">
            <Col style={{minWidth:"30%"}}>
                <Card title="Employee" bordered={true} className="card">
                <Link to='/register_employee' className='item'>
                    <Button>Sign Up</Button>
                </Link>

                <Link to='/login_employee'>
                    <Button>Login</Button>
                </Link>
                <Route exact path='/login_employee' component={LoginFormEmployee} />
                </Card>
            </Col>
            <Col style={{minWidth:"30%", margin:"1%"}}>
                <Card title="Employer" bordered={true} className="card">
                <Link to='/register_employer' className='item'>
                    <Button>Sign Up</Button>
                </Link>
                <Link to='/login_employer'>
                    <Button>Login</Button>
                </Link>
                <Route exact path='/login_employer' component={LoginFormEmployer} />

                </Card>
            </Col>
            </Row>
            <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to='/register'>Register</Link>
            </p>
            </div>


            
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

  
  // updated
  export default connect(
    mapStateToProps  )(LandingPage);