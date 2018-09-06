import React from 'react';
// import { render } from 'react-dom';
import { ControlLabel, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './Corporation.scss';
import FieldFileInput from '../../../FileUpload/FileUpload';
// import history from '../../../../history';
// import { categorys } from '../../../../../Utils/Utils';

export const required = value => (value ? undefined : 'Required');

export const positiveValue = value => (
    value && value <= 0 ? 'Must be positive values' : undefined);

export const validate = (values) => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = emailPattern.test(values.email);

    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }
    return error;
};

export const renderField = ({
    placeholder, input, label, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <ControlLabel className="labelTxt">{label}</ControlLabel>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText" />
        {touched && ((error && (<span className="errorTxt">{error}</span>)))}
    </div>
);

export const phoneChange = (length, event) => {
    const elemtName = event.target.name;
    const value = event.target.value.toString();
    const valueLength = value.length;
    if (valueLength >= length) {
        if (elemtName === 'comPhoneText1') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText3')[0].focus();
        }
    }
    console.log('valueLength###$', valueLength);
    if (valueLength === 0) {
        if (elemtName === 'comPhoneText3') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText1')[0].focus();
        }
    }
};

export const customPhoneField = ({
    maxLength, placeholder, input, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <input
            {...input}
            maxLength={maxLength}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText"
            onKeyUp={phoneChange.bind(this, maxLength)} />
        {touched && ((error && (<span className="errorPhnTxt">{error}</span>)))}
    </div>
);

export const normalizeZip = (value) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    return onlyNums;
};

const Corporation = (props) => {
    const {
        handleSubmit, submitting,
    } = props;

    return (
        <div className="formOutterWrap">
            <form onSubmit={handleSubmit} className="Com-form-style">
                <Row>
                    <Col lg={6} sm={6} xs={12}>
                        <Field
                            name="comName"
                            component={renderField}
                            label="Your Full Name*"
                            validate={required} />
                        <Field
                            name="comEmployee"
                            component={renderField}
                            type="text"
                            normalize={normalizeZip}
                            label="Number of employees(optional)"
                            placeholder="2-5" />
                        <Field
                            name="comBusinessName"
                            component={renderField}
                            label="Name of Business*"
                            validate={required} />
                        <Field
                            name="comCity"
                            component={renderField}
                            label="City*"
                            validate={required}/>
                        <div className="form-group customRadioBtn">
                            <ControlLabel>
                                <input type="checkbox"/>
                                {' '}
I am a non-profit 501(c) organization
                            </ControlLabel>
                        </div>
                    </Col>

                    <Col lg={6} sm={6} xs={12}>
                        <div className="formright">
                            <Field
                                name="email"
                                component={renderField}
                                type="text"
                                label="Email*" />
                            <div className="form-group customPhoneBoxWrap">
                                <ControlLabel className="labelTxt">
Phone Number*
                                </ControlLabel>
                                <Row className="phonenumber">
                                    <Col
                                        lg={4}
                                        xs={4}
                                        className="number">
                                        <Field
                                            name="comPhoneText1"
                                            type="text"
                                            normalize={normalizeZip}
                                            style={{ width: '80px' }}
                                            maxLength="3"
                                            component={customPhoneField}
                                            validate={[required,
                                                positiveValue]} />

                                    </Col>
                                    <Col
                                        lg={4}
                                        xs={4}
                                        className="number">
                                        <Field
                                            name="comPhoneText2"
                                            type="text"
                                            normalize={normalizeZip}
                                            maxLength="3"
                                            component={customPhoneField}
                                            validate={[required,
                                                positiveValue]} />

                                    </Col>
                                    <Col lg={4} xs={4} className="number">
                                        <Field
                                            name="comPhoneText3"
                                            type="text"
                                            normalize={normalizeZip}
                                            maxLength="4"
                                            component={customPhoneField}
                                            validate={[required,
                                                positiveValue]} />

                                    </Col>
                                </Row>
                            </div>
                            <Field
                                name="comAddress"
                                component={renderField}
                                label="Street Address*"
                                validate={required} />
                            <Row>
                                <Col lg={7} sm={7}>
                                    <Field
                                        name="comState"
                                        component={renderField}
                                        validate={required}
                                        label="State*" />

                                </Col>
                                <Col lg={5} sm={5} className="zip">
                                    <Field
                                        name="comZip"
                                        type="text"
                                        component={renderField}
                                        validate={required}
                                        normalize={normalizeZip}
                                        label="Zip*" />

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className="fileuploadwrap">
                    <Col lg={8} sm={12}>
                        <div className="fileupload">
                            <p >
Please upload any supporting documents.
 Please note verification of these documents can take up to 24 hours.
                                <br/>
                                {' '}
                                <br/>
                                {' '}
                                <b>Supported documents include:</b>
                                {' '}
Resale certificate, Business License,
Professional license or permit, State tax exemption, Membership document

                            </p>
                        </div>
                    </Col>
                    <Col lg={4} sm={12}>
                        <div className="fileuploadbuton">
                            <Field
                                name="uploadFile"
                                component={FieldFileInput}
                                validate={required}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="formBtnWrap">
                    <button
                        className="formBtn"
                        type="submit"
                        disabled={submitting}>
Next

                    </button>
                </div>
            </form>
        </div>
    );
};


Corporation.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
    form: 'Com', // a unique identifier for this form
    destroyOnUnmount: false,
    validate,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(Corporation);
