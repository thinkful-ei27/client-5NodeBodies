import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../components/home';

describe('<Home />', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  })
});



