import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import './GovtBusinessInfo.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { categorys } from '../../../../Utils/Utils';
// import history from '../../../history';
import loginAction from '../../../actions/LoginAction';


export const required = value => (value ? undefined : 'Required');
export const positiveValue = value => (
    value && value <= 0 ? 'Must be positive values' : undefined);


export const validate = (values) => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = emailPattern.test(values.Email);

    if (!values.Email) {
        error.Email = 'Required';
    } else if (!validEmail) {
        error.Email = 'Please Enter a Valid Email';
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

export const renderDropDown = ({ label, input, meta: { touched, error } }) => (
    <div className="form-group">
        <ControlLabel className="labelTxt">{label}</ControlLabel>
        <br />
        <select {...input} className="form-control SqaureText">
            <option value="" disabled >Search categories</option>
            {categorys.map(obj => (
                <option value={obj.value} key={obj.id}>
                    {obj.value}

                </option>
            ))}
        </select>
        {touched && error && <span className="errorTxt">{error}</span>}
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

// eslint-disable-next-line
class govtBusinessInfo extends Component {
    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="formOutterWrap">
                <Row>
                    <Col lg={12} sm={12}>
                        <p className="GovHeaderTxtWrap">
                            <b> Tell us about your organization</b>
                        </p>
                    </Col>
                </Row>
                <form onSubmit={handleSubmit} className="Com-form-style">
                    <Row>
                        <Col lg={6} sm={6} xs={12}>
                            <Field
                                name="name"
                                component={renderField}
                                label="Your Full Name*"
                                validate={required} />
                            <Field
                                name="categorys"
                                className="categorys"
                                component={renderDropDown}
                                validate={[required]}
                                label="Organization Category*" />
                            <Field
                                name="agency"
                                component={renderField}
                                label="Agency Name*"
                                validate={required} />
                            <Field
                                name="title"
                                component={renderField}
                                label="Title*"
                                validate={required} />
                            <div className="form-group customRadioBtn">
                                <ControlLabel>
                                    <input type="checkbox" />
                                    {' '}
I am a non-profit 501(c) organization
                                </ControlLabel>
                            </div>
                        </Col>

                        <Col lg={6} sm={6} xs={12}>
                            <div className="formright">
                                <Field
                                    name="Email"
                                    component={renderField}
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
                                    name="Address"
                                    component={renderField}
                                    label="Street Address*"
                                    validate={required} />
                                <Field
                                    name="City"
                                    component={renderField}
                                    label="City*"
                                    validate={required} />
                                <Row>
                                    <Col lg={7} sm={7}>
                                        <Field
                                            name="state"
                                            component={renderField}
                                            validate={required}
                                            label="State*" />

                                    </Col>
                                    <Col lg={5} sm={5} className="zip">
                                        <Field
                                            name="zip"
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
    }
}

govtBusinessInfo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};

const GovtBusinessPage = reduxForm({
    form: 'Govt', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(govtBusinessInfo);


const selector = formValueSelector('Govt');

const mapStateToProps = state => ({
    CategoryValue: selector(state, 'categorys'),

});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        loginAction,
    ), dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(GovtBusinessPage);
