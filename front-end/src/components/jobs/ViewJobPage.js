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

const data = [
    {
      job_title: 'Cloud Infrastructure Engineer, Financial Services -- Google Cloud',
      min_req  : 'Bachelor\'s degree in Computer Science, Mathematics, related technical \
                  field, or equivalent practical experience. Experience designing, building, \
                  and deploying scalable cloud-based solution architectures.'
    },
    {
      job_title: 'Software Engineer Intern -- Facebook',
      min_req  : 'Currently pursuing a PhD degree in Computer Science or Computer Engineering, \
                similar technical field of study (e.g., Electrical Engineering, Mathematics, \
                  Information Technology) or equivalent practical experience.'
    },
    {
      job_title: 'Research Scientist, AI -- Bloomberg',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Research Scientist, AI, PhD -- Google',
      min_req  : 'Currently pursuing Phd, experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Systems and Infrastructure Engineer -- Google',
      min_req  : 'Experience in one or more of the following: architecting and/or developing large \
                    scale distributed systems, concurrency, multithreading or synchronization.'
    },
    {
      job_title: 'Computer Vision Engineer Intern, Masters  -- Google',
      min_req  : 'Currently pursuing Masters, experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Fullstack Software Developer -- IBM',
      min_req  : 'Coding experience in one of the following programming languages: C++, Java, Python or Go.'
    },
    {
      job_title: 'Research Scientist, AI -- Amazon',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Machine Learning Engineer -- Bloomberg',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Machine Learning Engineer -- Google',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
  ];


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
                    dataSource={data}
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