import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

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
    companyName: 'Company Info',
    companyInfo:'Company Info was not yet given.',
    companyImage: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
};


