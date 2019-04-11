import React from 'react';
import { shallow } from 'enzyme';
import { GraphContainer } from '../components/graph-container';

describe('<GraphContainer />', () => {
  it('renders without crashing', () => {
    const nodez= [{}];
    shallow(<GraphContainer nodez={nodez}/>);
  })
});