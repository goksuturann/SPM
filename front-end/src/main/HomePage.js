import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';

import './home-page.css';

export default class HomePage extends Component { 

    constructor(props) {
        super(props);
        this.state = { 
            jobs: "",
        };
    }

    

    render(){
      return(
          <div className='main-container'>
              <List
              className ='list-container'
              itemLayout="horizontal"
              renderItem={item => (
              <List.Item>
                  <List.Item.Meta
                  //avatar={<Avatar src={this.props.avatarSrc} />}
                  title={<a href="https://careers.google.com/jobs/results/85417408774185670-cloud-infrastructure-engineer-financial-services-google-cloud/?q=infrastructure">{item.job_title}</a>}
                  description=""
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