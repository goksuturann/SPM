import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

export default class HomePage extends Component { 

    constructor(props) {
        super(props);
    }

    

    render(){

        return(
            <div>
                <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
                )}
                />
            </div>
        );
    }


}