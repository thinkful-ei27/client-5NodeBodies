import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../components/login';

describe('<Login />', () => {
  it('renders without crashing', () => {
    shallow(<Login />);
  })
});



