import React from 'react';
import { shallow } from 'enzyme';
import { StudentLanding } from '../components/studentLandingPage';

describe('<StudentLanding />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<StudentLanding dispatch={spy}/>);
  })
})