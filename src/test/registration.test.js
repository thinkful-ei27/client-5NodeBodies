import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '../components/registration';

describe('<RegisterForm />', () => {
  it('renders without crashing', () => {
    shallow(<RegisterForm />);
  });

});