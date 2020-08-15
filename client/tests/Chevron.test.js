import React from 'react';
import Chevron from '../components/Chevron.jsx';
import { shallow } from 'enzyme';

describe('Answer Component', () => {
  it('should display a svg when direction is "up"', () => {
    const wrapper = shallow(<Chevron direction={'up'}/>);

    let svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
  })

  it('should display a svg when direction is "down"', () => {
    const wrapper = shallow(<Chevron direction={'down'}/>);

    let svg = wrapper.find('svg');

    expect(svg.exists()).toBe(true);
  })
})