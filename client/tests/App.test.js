import React from 'react';
import App from '../components/App.jsx';
import { shallow } from 'enzyme';


describe('App Component', () => {
  it('should call the getQuestions funciton', () => {
    const wrapper = shallow(<App />)

    const spyGetQuestions = jest.spyOn(wrapper.instance(), 'getQuestions');
    wrapper.instance().forceUpdate();
    wrapper.instance().componentDidMount();
    expect(spyGetQuestions).toHaveBeenCalled();
  })
});