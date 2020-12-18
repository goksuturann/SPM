import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import google_logo from '../../components/google-new-logo.png';

export default class CompanyInfo extends Component {
    render() {
        const {companyName, companyInfo, companyImage} = this.props;
        return(
            <div>
                <Card 
                    title={companyName}
                    cover={
                    <img
                        alt="example"
                        src={companyImage}
                    />
                    }>
                {companyInfo}
                </Card>      
            </div>
        );
    }
}

CompanyInfo.propTypes = {
    companyName: PropTypes.string,
    companyInfo: PropTypes.string,
    companyImage: PropTypes.string,
};

CompanyInfo.defaultProps = {
    companyName: 'Google',
    companyInfo:'Google was founded by Larry Page and Sergey Brin while they were students at Stanford University. \
    The company was officially launched in September 1998 in a friend’s garage. In one of the most anticipated Initial \
    Public Offerings (IPO) Google raised $1.67 billion in August of 2004. Today, Google has over 12,000 employees in \
    offices throughout the world.',
    companyImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
};


