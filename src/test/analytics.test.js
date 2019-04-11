import React from 'react';
import { shallow } from 'enzyme';
import Analytics from '../components/analytics';

describe('<Analytics />', () => {
  it('renders without crashing', () => {
    shallow(<Analytics />);
  })
});