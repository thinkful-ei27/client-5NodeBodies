import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from '../components/login-form';

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  })
});



