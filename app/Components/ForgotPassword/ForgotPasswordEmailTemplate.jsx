import React from 'react';
import { ControlLabel } from 'react-bootstrap';
import history from '../../history';

const ForgotPasswordEmailTemplate = () => (
    <div className="containInnerWrap">
        <div className="loginBoxWrap">
            <div className="loginBox">
                <div>
                    <ControlLabel
                        className="labelTxt">
                    Hit the button below to reset your password
                    </ControlLabel>
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btnSignIn"
                        onClick={() => history.push('./forgot-password')}>
                    Reset Password

                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ForgotPasswordEmailTemplate;
