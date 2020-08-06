import React from 'react';
import App from '../components/App.jsx';
import {shallow} from 'enzyme';

describe('App Component', () => {
  it('starts with a count of 0', () => {
    const wrapper = shallow(<App />);
    const countState = wrapper.state().counter;
    expect(countState).toEqual(0);
  })
});