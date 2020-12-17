import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {Field, FormSection, reduxForm} from 'redux-form';
import {DatePicker, Input, Button, Form, message} from 'antd';
import {Checkbox, Select, Layout} from 'antd';
import CompanyInfo from './CompanyInfo';
import { connect } from 'react-redux';
import { post_job } from '../../actions/jobs';

import './post-job-form.css';
const { Option } = Select;

const { Sider, Content } = Layout;

class PostJobForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                    date: ''
                };
        this.setDate = this.setDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setDate(value){
        console.log(value)
        this.setState({ date: value });
    }

    handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        
        console.log(value)
        this.setDate(value.format('YYYY-MM-DD'));
        console.log("Date: " + this.state.date);
    };

    onFinish = (fieldsValue) => {
        const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
    };

    onSubmit = formValues => {
        this.props.post_job(formValues,this.state.date, this.props.user);
    };    

    render() {
        console.log(this.props.user)
        if(!this.props.isAuthenticated){
            return <Redirect to='/'/>;
        }
        const {keywords}= this.props;

        const children = [];
        for (let i = 0; i < keywords.length; i++) {
        children.push(<Option key={keywords[i]}>{keywords[i]}</Option>);
        }

        return(
            <div className='post-job-form-container'>
                <div className='job-form-container'>
                    <Form className="job-form"
                        onFinish={values => this.onSubmit(values)}
                        scrollToFirstError
                    >
                        <Form.Item>
                            <CompanyInfo className='company-info'></CompanyInfo>
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Job Title"
                            name="job_title"
                            rules={[{ required: true, message: 'Please input the job title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className="date-picker-checkbox" label="Job Offer End Date">
                            <DatePicker onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Keyword"
                            name="keywords"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select keywords"
                                defaultValue={['Software Developer']}
                                //onChange={handleChange}
                            >
                            {children}
                            </Select>
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Salary"
                            name="salary"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Minimum Requirements"
                            name="min_req"
                            rules={[{ required: true, message: 'Please enter the minimum requirements!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Preferred Qualifications"
                            name="recommend_req"
                            rules={[{ required: true, message: 'Please enter the preferred qualifications!' }]}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item className="checkbox">
                            <Checkbox>Enable Communication</Checkbox>
                        </Form.Item>
                        <Form.Item className='job-item'
                        wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                        }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

PostJobForm.propTypes = {
    keywords: PropTypes.array,
    companyImage: PropTypes.string,
};

PostJobForm.defaultProps = {
    keywords: ['Software Developer', 'Software', 'Frontend', 'Backend', 'Fullstack'],
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });
  
PostJobForm = connect(
    mapStateToProps,
    { post_job }
  )(PostJobForm);
export default connect(mapStateToProps,{post_job})(PostJobForm);

