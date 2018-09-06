import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';
import { expect } from 'chai';
import PrivateRoute from './PrivateRouter';

describe('PrivateRouter', () => {
    const wrapper = shallow(<PrivateRoute />);

    it('Should render the component', () => {
        expect(wrapper).to.exist;
    });

    it('set Local localStorage value', () => {
        localStorage.setItem('user', {
            emailId: 'professional@overstock.com',
            password: 'Overstock18',
        });
    });

    it('should find the PrivateRouter ', () => {
        const pathMap = wrapper.find(Route).reduce((route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});

        console.log(pathMap);
    });
});
