import React from 'react';
import { shallow } from 'enzyme';
import CurrentNodeBrancher from '../components/current-node-brancher';

describe('<CurrentNodeBrancher />', () => {
  it('renders without crashing', () => {
    shallow(<CurrentNodeBrancher />);
  })
});