import React from 'react';
import SubmitQuestion from '../components/SubmitQuestion.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EnzymeToJson from 'enzyme-to-json';
import { mount } from 'enzyme';

// Test Data for Submit Question
const product_name = 'Test Product Name';
const product_id = 0;
const mockHandleOpenSubmit = jest.fn();


describe('Answer Component', () => {
  it('should not close modal when input is invalid and save button is clicked', () => {

    const mockHandleCloseSubmit = jest.fn();

    const wrapper = shallow(
      <SubmitQuestion
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        product_name={product_name}
        product_id={product_id}
        show={true}
      />
    );

    wrapper.find('.qBodyInput').simulate('change', { target: { value: 'Some Answer' } });
    wrapper.find('.qNameInput').simulate('change', { target: { value: 'Some Name' } });
    wrapper.find('.qEmailInput').simulate('change', { target: { value: 'Not an email' } });

    let saveButton = wrapper.find('.saveButton');
    saveButton.simulate('click');

    let alert = wrapper.find('.inValidAlert');

    expect(alert.length > 0).toBe(true);

    expect(mockHandleCloseSubmit.mock.calls.length).toBe(0);
  })

  it('should close modal and not show alert when input is valid and save button is clicked', () => {

    const mockHandleCloseSubmit = jest.fn();

    const wrapper = shallow(
      <SubmitQuestion
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        product_name={product_name}
        product_id={product_id}
        show={true}
      />
    );

    wrapper.find('.qBodyInput').simulate('change', { target: { value: 'Some Question' } });
    wrapper.find('.qNameInput').simulate('change', { target: { value: 'Some Name' } });
    wrapper.find('.qEmailInput').simulate('change', { target: { value: 'some@email.com' } });

    let saveButton = wrapper.find('.saveButton');
    saveButton.simulate('click');

    let alert = wrapper.find('.inValidAlert');

    expect(alert.length > 0).toBe(false);

    expect(mockHandleCloseSubmit.mock.calls.length).toBe(1);
  })

  it('should match snapshot when show=true', () => {

    const mockHandleCloseSubmit = jest.fn();

    // this test did not like renderer for some reason
    const submitQuestionDisplay = mount(
      <SubmitQuestion
        handleOpenSubmit={mockHandleOpenSubmit}
        handleCloseSubmit={mockHandleCloseSubmit}
        product_name={product_name}
        product_id={product_id}
        show={true}
      />
    );

    expect(EnzymeToJson(submitQuestionDisplay)).toMatchSnapshot();

  })

});