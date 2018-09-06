
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './ForgotPassword.scss';
import history from '../../history';
import '../Login/Login.scss';

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

/* eslint-disable react/prop-types */
export const renderField = ({
    placeholder, label, type, input,
    meta: { touched, error },
}) => (
    <div className="form-group">
        <label
            htmlFor={label}
            className="labelTxt_2">
            {label}
        </label>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="form-control" />
        {touched && (error && (
            <span className="errorTxt">
                {error}
            </span>
        ))}
    </div>);

export const SendEmail = (props) => {
    const { handleSubmit } = props;
    const handleSubmitForm = (values) => {
        console.log('values', values);
        history.push('./email-template');
    };
    return (

        <div className="loginBoxWrap">
            <div className="loginBox">
                <h1 className="title_h1 forgotTitle">
Forgot Password
                    <span className="signInTxt">
Enter your email address and we will send you a link.
                    </span>
                </h1>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Field
                        name="email"
                        type="email"
                        component={renderField}
                        label="Email"
                        placeholder="Email" />
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btnSignIn">
Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

const SendEmailForm = reduxForm({
    form: 'SendEmail',
    validate,
})(SendEmail);

export const mapStateToProps = state => ({
    enableReinitialize: true,
    initialValues: {
        email: state.login.emailId,
    },
});

export default connect(mapStateToProps)(SendEmailForm);
