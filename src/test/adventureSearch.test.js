import React from 'react';
import { shallow } from 'enzyme';
import { AdventureSearch } from '../components/adventureSearch';
import '../setupTests.js';

describe('<AdventureSearch />', () => {
  it('renders without crashing', () => {
    shallow(<AdventureSearch />);
  })
  it('should contain a form, label, input, and button', () => {
    const wrapper = shallow(<AdventureSearch />);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
});