import React from 'react';
import { shallow } from 'enzyme';
import CombinedAdventure from '../components/combinedAdventure';

describe('<CombinedAdventure />', () => {
  it('renders without crashing', () => {
    shallow(<CombinedAdventure />);
  })
});