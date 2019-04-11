import React from 'react';
import { shallow } from 'enzyme';
import AdventureBuilder from '../components/adventureBuilder';

describe('<AdventureInfo />', () => {
  it('renders without crashing', () => {
    shallow(<AdventureBuilder />);
  })
});