import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './ForgotPassword.scss';
import history from '../../history';

export const validate = (values) => {
    const error = {};
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);

    if (!values.password) {
        error.password = 'Required';
    }

    if (!values.confirmPassword) {
        error.confirmPassword = 'Required';
    }

    if (values.password !== values.confirmPassword) {
        error.confirmPassword = 'Please provide correct password';
    }
    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    }
    if (!values.confirmPassword) {
        error.confirmPassword = 'Required';
    } else if (values.confirmPassword.length < 8) {
        error.confirmPassword = 'Password should be greater than 8';
    } else if (values.confirmPassword.length > 15) {
        error.confirmPassword = 'Password should be lesser than 16';
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

class ForgotPassword extends React.Component {
    componentDidMount() {
        // document.addEventListener('keydown', this.escFunction, false);
    }

    // escFunction(event) {
    //     if (event.keyCode === 32) {
    //         event.preventDefault();
    //     }
    // }

    render() {
        const { handleSubmit } = this.props;
        const handleSubmitForm = (values) => {
            console.info('FormValues', values);
            history.push('./login');
        };
        return (
            <div className="containInnerWrap">
                <div className="loginBoxWrap">
                    <div className="loginBox">
                        <h1 className="title_h1 forgotTitle">
Forgot Password
                            <span className="signInTxt">Enter a new password</span>
                        </h1>

                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <Field name="password" type="password" component={renderField} label="Create New Password" />
                            <Field name="confirmPassword" type="password" component={renderField} label="Confirm Password"/>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btnSignIn">
Done
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'forgotPassword',
    validate,
})(ForgotPassword);
