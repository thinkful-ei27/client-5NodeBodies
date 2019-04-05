import React from 'react';
import { shallow } from 'enzyme';
import Headerbar from '../components/headerbar';

describe('<Headerbar />', () => {
  it('renders without crashing', () => {
    shallow(<Headerbar/>);
  });
});