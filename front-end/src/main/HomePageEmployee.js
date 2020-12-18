import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';

import './home-page.css';



export default class HomePageEmployee extends Component { 

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
              <List.Item actions={[<a key="list-apply">Apply for Job</a>]}>
                  <List.Item.Meta
                  //avatar={<Avatar src={this.props.avatarSrc} />}
                  title={item.job_title}
                  description={item.min_req}
                  />
              </List.Item>
              )}
              />
          </div>
      );
    }
}

HomePageEmployee.propTypes = {
  avatarSrc: PropTypes.string,
};

HomePageEmployee.defaultProps = {
  avatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
};