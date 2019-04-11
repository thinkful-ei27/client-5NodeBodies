import React from 'react';
import { shallow } from 'enzyme';
import adventureSearch from '../components/adventureSearch';

describe('<adventureSearch />', () => {
  it('renders without crashing', () => {
    shallow(<adventureSearch />);
  })
});