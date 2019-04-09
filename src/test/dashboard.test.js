import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../components/dashboard';

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  })
});