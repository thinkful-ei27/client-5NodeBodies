import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '../components/registration';
import '../setupTests.js';

describe('<RegisterForm />', () => {
  it('renders without crashing', () => {
    shallow(<RegisterForm />);
  });
});