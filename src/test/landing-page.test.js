import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from '../components/landing-page';

describe('<LandingPage />', () => {
  it('renders without crashing', () => {
    shallow(<LandingPage />);
  })
});