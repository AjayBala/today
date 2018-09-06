import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import FileUpload from './FileUpload';
import Login from '../../../assets/Images/Login.png';

describe('Test suits for <FileUpload />', () => {
    const input = { onChange: sinon.spy() };
    const shallowWrapper = shallow(<FileUpload
        input={input}
        label="NoFileChosen"
    />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });

    it('Com page onChange function', () => {
        expect(shallowWrapper).to.exist;
        const e = { target: { files: [{ Login }] } };
        shallowWrapper.find('#file-input').at(0).simulate('change', e);
    });
});
