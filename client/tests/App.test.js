import React from 'react';
import App from '../components/App.jsx';
import {shallow} from 'enzyme';

describe('App Component', () => {
  it('starts with a count of 0', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('.count').text();

    expect(text).toEqual('Current Count: 0');
  })

  it('increments the count when the button is clicked', () => {
    const wrapper = shallow(<App />);

  })
});