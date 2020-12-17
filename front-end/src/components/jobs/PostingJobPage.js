import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {Field, FormSection, reduxForm} from 'redux-form';
import {DatePicker, Input, Button, Form, message} from 'antd';
import {Checkbox, Select, Layout} from 'antd';
import CompanyInfo from './CompanyInfo';

import './post-job-form.css';

const { Sider, Content } = Layout;

export default class PostJobForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                    date: ''
                };
        this.setDate = this.setDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    setDate(value){
        this.setState({ date: value });
    }

    handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        this.setDate(value);
        console.log("Date: " + this.state.date);
    };

    renderField = ({input, label, type, meta: {touched, error}}) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
              <label>{label}</label>
              <input {...input} type={type} />
              {touched && error && (
                <span className='ui pointing red basic label'>{error}</span>
              )}
            </div>
          );
    };

    /*
    hiddenField = ({type, meta: {error}}) => {
        return (
            <div className='field'>
                <input type={type} />
                {error && <div className = 'ui red message'>{error}</div>}
            </div>
        );
    }; */

    onFinish = (fieldsValue) => {
        const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
    };
    
    //<Checkbox onChange={onChange}>Checkbox</Checkbox> for onChange

    render() {
        const {keywords}= this.props;
        return(
            <div className='post-job-form-container'>
                <div className='job-form-container'>
                    <Form className="job-form">
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
                            <DatePicker />
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Keyword"
                            name="keyword"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select keywords"
                                defaultValue={['Software Developer']}
                                //onChange={handleChange}
                            >
                            {keywords}
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
                            name="min_requirements"
                            rules={[{ required: true, message: 'Please enter the minimum requirements!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Preferred Qualifications"
                            name="pref_qualifications"
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
    employer: PropTypes.object.isRequired,
    keywords: PropTypes.array,
    companyImage: PropTypes.string,
};

PostJobForm.defaultProps = {
    keywords: ['Software Developer', 'Software', 'Frontend', 'Backend', 'Fullstack'],
};

