import React from 'react';
import { shallow } from 'enzyme';
import WrongTurn from '../components/wrongTurn';

describe('<WrongTurn />', () => {
  it('renders without crashing', () => {
    shallow(<WrongTurn />);
  })
})