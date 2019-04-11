import React from 'react';
import { shallow } from 'enzyme';
import requiresLogin from '../components/requires-login';

describe('<requiresLogin />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<requiresLogin />);
  })
});