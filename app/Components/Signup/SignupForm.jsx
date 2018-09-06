import React, { Component, Fragment } from 'react';
import {
    ControlLabel, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import './Signup.scss';
import history from '../../history';
import logofavicon from '../../../assets/Images/overstock_favicon.png';


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

    const capital = document.getElementById('capital');
    const special = document.getElementById('special');
    const length = document.getElementById('length');
    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    } else if (!values.password.length >= 8) {
        error.password = 'Password should be greater than 8';
        length.classList.add('errorClass');
        capital.classList.remove('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(upperCaseLetters)) {
        error.password = 'Need upper case';
        length.classList.remove('errorClass');
        capital.classList.add('errorClass');
        special.classList.remove('errorClass');
    } else if (!values.password.match(SpecialSmallLetters)) {
        error.password = 'Need Atleast one special Character';
        length.classList.remove('errorClass');
        capital.classList.remove('errorClass');
        special.classList.add('errorClass');
    } else if (values.password.match(SpecialSmallLetters)) {
        special.classList.remove('errorClass');
    }
    return error;
};

/* eslint-disable react/prop-types */
export const renderField = ({
    label, type, input,
    meta: { touched, error },
}) => (
    <Fragment>
        <FormGroup className="formRowWrap">
            <ControlLabel className="labelTxt">
                {label}
            </ControlLabel>
            <FormControl
                {...input}
                type={type}
                autoComplete="off"
                className="inputTxtStyle" />
            {touched && (error && (
                <span className="errorTxt">
                    {error}
                </span>
            ))}
        </FormGroup>
    </Fragment>);

class SignupForm extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }

    // onSubmitCall = (values) => {
    //     const { email } = values;
    //     const qualifiedGovId = ['.gov', '.mil', '.state', '.edu'];
    //     let getDomain = email.substring(email.lastIndexOf('.'));
    //     getDomain = getDomain.toLowerCase();
    //     if (qualifiedGovId.includes(getDomain)) {
    //         history.push('/gov');
    //     } else {
    //         history.push('/com');
    //     }
    // }

        handlePasswrdChange = (event) => {
            console.log(event.target.value);
            const inputPass = document.getElementsByName('password')[0].value;

            const capital = document.getElementById('capital');
            const special = document.getElementById('special');
            const length = document.getElementById('length');


            // Atleast one special Character
            const upperCaseLetters = /[A-Z]/g;
            if (inputPass.match(upperCaseLetters)) {
                capital.classList.remove('invalid');
                capital.classList.add('valid');
            } else {
                capital.classList.remove('valid');
                capital.classList.add('invalid');
            }


            // Length of 8 Characters minimum
            if (inputPass.length >= 8) {
                length.classList.remove('invalid');
                length.classList.add('valid');
            } else {
                length.classList.remove('valid');
                length.classList.add('invalid');
            }


            // Atleast one special Character
            const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;
            if (inputPass.match(SpecialSmallLetters)) {
                special.classList.remove('invalid');
                special.classList.add('valid');
            } else {
                special.classList.remove('valid');
                special.classList.add('invalid');
            }
        }


        escFunction(event) {
            if (event.keyCode === 32) {
                event.preventDefault();
            }
        }

        render() {
            const { handleSubmit } = this.props;

            const handlePagesOnSubmit = (values) => {
                const { email } = values;
                const qualifiedGovId = ['.gov', '.mil', '.state', '.edu'];
                let getDomain = email.substring(email.lastIndexOf('.'));
                getDomain = getDomain.toLowerCase();
                if (qualifiedGovId.includes(getDomain)) {
                    history.push('/gov');
                } else {
                    history.push('/com');
                }
            };
            return (

                <div className="formWrap">
                    <h1 className="signupTitle_1">
                        <img src={logofavicon} alt="" />
                        <br/>
                    New to Overstock professional? Sign Up.
                    </h1>
                    <form onSubmit={handleSubmit(handlePagesOnSubmit)}>
                        <Field
                            name="email"
                            component={renderField}
                            type="text"
                            label="Email"/>
                        <Field
                            name="password"
                            id="psw"
                            component={renderField}
                            type="password"
                            onChange={this.handlePasswrdChange}
                            onFocus={() => {
                                document.getElementById('messagePwd').style.display = 'block';
                            }}
                            onBlur={() => {
                                document.getElementById('messagePwd').style.display = 'none';
                                document.getElementById('messagePwd').style.display = 'block';
                            }}
                            label="Create Password"/>

                        <div id="messagePwd">
                            <p id="length" className="invalid">✔ 8 Character minimum </p>
                            <p id="capital" className="invalid">✔ At least one capital letter</p>
                            <p id="special" className="invalid">✔ At least one special characters (!,*,$,@)</p>
                        </div>
                        <div className="form-group formRowWrap">
                            <Button
                                type="submit"
                                onClick={this.handlePasswrdChange}
                                className="btnBlueStyle createAccBtn">
                        Create Account

                            </Button>
                        </div>
                    </form>
                    <p className="signInTxt">
                    Already a member of Overstock Professional?
                        <a onClick={() => history.push('/login')}>Sign In </a>
                    </p>
                </div>
            );
        }
}

export default reduxForm({
    form: 'SignupForm',
    validate,
})(SignupForm);
