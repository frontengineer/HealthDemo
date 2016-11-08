require('babel-register');
import React from 'react';
import expect from 'expect';
import ReactTestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import App from '../App.jsx';


describe('DetailView', () => {

  it('calls componentDidMount', () => {
    const wrapper = shallow(
      <App />,
      { context: { foo: 10 } }
    );
    expect(wrapper.context().foo).to.equal(10);
    expect(wrapper.context('foo')).to.equal(10);
  });

});
