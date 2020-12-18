import { Card, Avatar, List } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../reducers/auth';
import avatar from '../../components/avatar.png';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import './view-job.css';


const { Header, Content, Footer, Sider } = Layout;

class SettingLink extends Component {
    render(){
        return(
            <Link to='/profile' >
                <SettingOutlined key="setting" />
            </Link>
        );
    }
}
  

class ViewJobPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
      };

    render() {
        const {user, isAuthenticated} = this.props;
        const {collapsed} = this.state

        if(!isAuthenticated ){
            return <Redirect to='/'></Redirect>
        }

        const description = "Email: " + user.email + ", Job Seeker";


        return(
            <Layout className='main-container'>
                <Sider collapsible 
                collapsed={collapsed} 
                onCollapse={this.onCollapse}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                >
                <div className='logo' />
                    <Card
                        className='card-item'
                        actions={[
                        <SettingLink key="setting" />,
                        <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Card.Meta
                        avatar={<Avatar src={avatar}/>}
                        title={user.username}
                        description={description}
                        />
                </Card>
                </Sider>
                <Layout>
                <Content className ='list-container-jobs' >
                <div>
                    <List
                    header={<div className='header'>List of Applied Jobs</div>}
                    itemLayout="horizontal"
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.job_title}
                        />
                    </List.Item>
                    )}
                    />
                </div>
                
              </Content>
                </Layout>
            </Layout>
        );
    }
}

// added
const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});
  
export default connect(mapStateToProps)(ViewJobPage);