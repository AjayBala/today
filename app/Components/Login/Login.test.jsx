import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginPage, {
    validate, Login, renderField,
} from './Login';

describe('Test suits for <LoginPage />', () => {
    let component;
    let wrapperRedComp;
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({});
        const handleSubmit = sinon.spy();
        const handleSubmitForm = sinon.spy();
        wrapperRedComp = shallow(<Login
            handleSubmit={handleSubmit}
            handleSubmitForm={handleSubmitForm}/>);
        component = mount(
            <Provider store={store}>
                <LoginPage handleSubmit={handleSubmitForm}/>
            </Provider>,
        );
    });

    afterEach(() => {
        component.unmount();
    });

    it('Check if the werapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });

    it('inValid Email', () => {
        const aptError = validate({ email: '' });
        expect(aptError.email).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ email: 'Overstock@' });
        expect(aptError.email).to.equal('Please Enter a Valid Email');
    });

    it('inValid Email', () => {
        const aptError = validate({ email: 'Overstock.com' });
        expect(aptError.email).to.equal('Please Enter a Valid Email');
    });

    it('Passing valid emailId', () => {
        const aptError = validate({ email: 'Overstock@gmail.com' });
        expect(aptError.email).to.equal(undefined);
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '1234567' });
        expect(aptError.password).to.equal('Password should be greater than 8');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '1234567890123456' });
        expect(aptError.password).to.equal('Password should be lesser than 16');
    });

    it('Passing valid Password', () => {
        const aptError = validate({ password: 'qwerty@123' });
        expect(aptError.password).to.equal(undefined);
    });

    it('login page API called and UI should render', () => {
        const instance = wrapperRedComp.instance();
        const keyCode = sinon.spy();
        const preventDefault = sinon.spy();
        wrapperRedComp.setProps({
            email: { value: 'overstock@gmail.com' },
            values: '',
        });
        instance.callback();
        instance.verifyCallback();
        // instance.goToForgot();
        // instance.goToB2BMigration();
        instance.goToCreateAccount();
        instance.escFunction(keyCode, preventDefault);
    });

    it('should load the LoginComponent a click', () => {
        const LogoLink = wrapperRedComp.find('a');
        LogoLink.simulate('click');
    });

    it('should load the LoginComponent a click', () => {
        const handleclick = wrapperRedComp.find('handleSubmitForm');
        handleclick.simulate('click').at(0);
    });

    it('should load the LoginComponent by btn1 click', () => {
        const BtnLink1 = wrapperRedComp.find('button').at(1);
        BtnLink1.simulate('click');
    });

    it('should load the LoginComponent by btn2 click', () => {
        const BtnLink2 = wrapperRedComp.find('button').at(2);
        BtnLink2.simulate('click');
    });

    it('renders an error message for the input', () => {
        const input = { name: 'email' };
        const label = 'Email*';
        const meta = { touched: true, error: 'Required' };
        const type = 'email';
        const placeholder = 'Email';
        const element = renderField({
            placeholder, label, type, input, meta,
        });
        shallow(element);
    });
});
