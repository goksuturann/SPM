import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';

import './home-page.css';

const data = [
    {
      job_title: 'Cloud Infrastructure Engineer, Financial Services -- Google Cloud',
      min_req  : 'Bachelor\'s degree in Computer Science, Mathematics, related technical \
                  field, or equivalent practical experience.\nExperience designing, building, \
                  and deploying scalable cloud-based solution architectures.'
    },
    {
      job_title: 'Software Engineer Intern -- Facebook',
      min_req  : 'Currently pursuing a PhD degree in Computer Science or Computer Engineering, \
                similar technical field of study (e.g., Electrical Engineering, Mathematics, \
                  Information Technology) or equivalent practical experience.'
    },
    {
      job_title: 'Research Scientist, AI -- Amazon',
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
      job_title: 'Fullstack Software Developer',
      min_req  : 'Coding experience in one of the following programming languages: C++, Java, Python or Go.'
    },
    {
      job_title: 'Research Scientist, AI -- Amazon',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Machine Learning Engineer -- Google',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
    {
      job_title: 'Machine Learning Engineer -- Google',
      min_req  : 'Experience in Artificial Intelligence and Machine Learning.'
    },
  ];

export default class HomePage extends Component { 

    constructor(props) {
        super(props);
        this.state = { 
            jobs: data,
        };
    }

    

    render(){
      return(
          <div className='main-container'>
              <List
              className ='list-container'
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
              <List.Item>
                  <List.Item.Meta
                  //avatar={<Avatar src={this.props.avatarSrc} />}
                  title={<a href="https://careers.google.com/jobs/results/85417408774185670-cloud-infrastructure-engineer-financial-services-google-cloud/?q=infrastructure">{item.job_title}</a>}
                  description={item.min_req}
                  />
              </List.Item>
              )}
              />
          </div>
      );
    }
}

HomePage.propTypes = {
  avatarSrc: PropTypes.string,
};

HomePage.defaultProps = {
  avatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
};