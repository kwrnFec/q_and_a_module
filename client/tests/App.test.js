import React from 'react';
import App from '../components/App.jsx';
import {shallow} from 'enzyme';

describe('App Component', () => {
  // Tests not working, can't get it to wait for async
  it('gets a list of questions', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.componentDidMount();
    const questions = await wrapper.state('questions');
    console.log(questions);

    expect(questions).not.toHaveLength(0);
  })

  // it('increments the count when the button is clicked', () => {
  //   const wrapper = shallow(<App />);
  //   const incrementBtn = wrapper.find('#increment');

  //   incrementBtn.simulate('click');

  //   const text = wrapper.find('.count').text();
  //   expect(text).toEqual('Current Count: 1');
  // })

  // it('decrements the count when the button is clicked', () => {
  //   const wrapper = shallow(<App />);
  //   const decrementBtn = wrapper.find('#decrement');

  //   decrementBtn.simulate('click');

  //   const text = wrapper.find('.count').text();
  //   expect(text).toEqual('Current Count: -1');
  // })
});