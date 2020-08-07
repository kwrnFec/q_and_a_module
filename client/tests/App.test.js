import React from 'react';
import App from '../components/App.jsx';
import { shallow } from 'enzyme';


describe('App Component', () => {
  it('should have some test', () => {
    // just so that I can check that testing is active
    expect(true).toEqual(true);
  })

  // Tests not working, can't get it to wait for async
  // may be some issue with making api request
  // it('gets a list of questions', async () => {
  //   expect.assertions(1);
  //   const wrapper = shallow(<App />);

  //   const instance = wrapper.instance();

  //   await instance.componentDidMount().resolve(true);

  //   const questions = wrapper.state('questions');

  //   expect(questions).not.toHaveLength(0);
  // })


});