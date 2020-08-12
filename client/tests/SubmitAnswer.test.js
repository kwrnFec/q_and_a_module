import React from 'react';
import SubmitAnswer from '../components/SubmitAnswer.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

// Test Data for Submit Answer
const product_name = 'Test Product Name';
const question_id = 0;
const question_body = 'Some test Question?';
const mockHandleOpenSubmit = jest.fn();


describe('SubmitAnswer Component', () => {
  it('should not close modal and should display alert when input is invalid and save button is clicked', () => {

    const mockHandleCloseSubmit = jest.fn();

    const wrapper = shallow(
      <SubmitAnswer
        product_name={product_name}
        question_id={question_id}
        question_body={question_body}
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        show={true}
      />
    );

    wrapper.find('.aBodyInput').simulate('change', { target: { value: 'Some Answer' } });
    wrapper.find('.aNameInput').simulate('change', { target: { value: 'Some Name' } });
    wrapper.find('.aEmailInput').simulate('change', { target: { value: 'Not an email' } });

    let saveButton = wrapper.find('.saveButton');
    saveButton.simulate('click');

    let alert = wrapper.find('.inValidAlert');

    expect(alert.length > 0).toBe(true);

    expect(mockHandleCloseSubmit.mock.calls.length).toBe(0);
  })

  it('should close modal and not show alert when input is valid and save button is clicked', () => {

    const mockHandleCloseSubmit = jest.fn();

    const wrapper = shallow(
      <SubmitAnswer
        product_name={product_name}
        question_id={question_id}
        question_body={question_body}
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        show={true}
      />
    );

    wrapper.find('.aBodyInput').simulate('change', { target: { value: 'Some Answer' } });
    wrapper.find('.aNameInput').simulate('change', { target: { value: 'Some Name' } });
    wrapper.find('.aEmailInput').simulate('change', { target: { value: 'some@email.com' } });

    let saveButton = wrapper.find('.saveButton');
    saveButton.simulate('click');

    let alert = wrapper.find('.inValidAlert');

    expect(alert.length > 0).toBe(false);

    expect(mockHandleCloseSubmit.mock.calls.length).toBe(1);
  })

  it('should match snapshot when show=true', () => {

    const mockHandleCloseSubmit = jest.fn();

    // this test did not like renderer for some reason
    const submitAnswerDisplay = mount(
      <SubmitAnswer
        product_name={product_name}
        question_id={question_id}
        question_body={question_body}
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        show={true}
      />
    );

    expect(EnzymeToJson(submitAnswerDisplay)).toMatchSnapshot();

  })

});