import React from 'react';
import { shallow } from 'enzyme';
import CreateHeadNode from '../components/create-head-node';

describe('<CreateHeadNode />', () => {
  it('renders without crashing', () => {
    shallow(<CreateHeadNode />);
  })
});