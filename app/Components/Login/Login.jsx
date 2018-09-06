import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import history from '../../history';
import loginAction from '../../actions/LoginAction';
import './Login.scss';

export const validate = (values) => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);

    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
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

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            recaptchaVerified: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }

  callback = () => {
      console.log('Recaptcha loaded');
  };

  verifyCallback = () => {
      this.setState({
          recaptchaVerified: true,
      });
  }

  goToForgot = () => {
      const { emailId, actions } = this.props;
      actions.getEmailId(emailId);
      history.push('/send-email');
  }

  goToB2BMigration = () => {
      const { emailId, password, actions } = this.props;
      actions.loginValues({ email: emailId, password });
      history.push('/shop-yesno');
  }

  goToCreateAccount = () => {
      history.push('/create-account');
  }

  escFunction(event) {
      if (event.keyCode === 32) {
          event.preventDefault();
      }
  }

  render() {
      const { handleSubmit } = this.props;
      const { recaptchaVerified } = this.state;
      const handleSubmitForm = (values) => {
          console.log('values', values);
          history.push('/home');
      };
      return (
          <div className="containInnerWrap">
              <h1 className="title_h1">
                    Sign In to Your Overstock Professional Account
              </h1>
              <div className="loginBoxWrap">
                  <div className="loginBox">
                      <form onSubmit={handleSubmit(handleSubmitForm)}>
                          <Field
                              name="email"
                              component={renderField}
                              label="Email"
                              placeholder="Email" />
                          <Field
                              name="password"
                              type="password"
                              component={renderField}
                              label="Password"
                              placeholder="Password" />
                          <Recaptcha
                              className="rca-styles"
                              sitekey="6LfKaWoUAAAAAJDt-nKlTsZ92TkprXJ2xqgZ-YND"
                              render="explicit"
                              verifyCallback={this.verifyCallback}
                              onloadCallback={this.callback}
                          />
                          <div className="form-group">
                              <button
                                  type="submit"
                                  className="btnSignIn"
                                  disabled={!recaptchaVerified}>
Sign In
                              </button>
                              <div className="forgotTxt">
                                  <a onClick={() => this.goToForgot()}>
                                  Forgot Password?
                                  </a>
                              </div>
                              <button
                                  type="button"
                                  className="btnSignIn"
                                  onClick={() => this.goToCreateAccount()}>
Create Account
                              </button>
                              <button
                                  type="button"
                                  className="btnSignIn"
                                  onClick={() => this.goToB2BMigration()}>
B2C To B2B Migration
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      );
  }
}
const LoginPage = reduxForm({
    form: 'login',
    validate,
})(Login);
const selector = formValueSelector('login');
const mapStateToProps = state => ({
    emailId: selector(state, 'email'),
    password: selector(state, 'password'),
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        loginAction,
    ), dispatch),
});

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage);
