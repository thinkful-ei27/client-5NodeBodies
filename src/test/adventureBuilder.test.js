import React from 'react';
import { shallow } from 'enzyme';
import { adventureBuilder } from '../components/adventureBuilder';

describe('<adventureBuilder />', () => {
  it('renders without crashing', () => {
    shallow(<adventureBuilder />);
  })
});