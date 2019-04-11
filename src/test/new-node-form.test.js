import React from 'react';
import { shallow } from 'enzyme';
import { NewNodeForm } from '../components/new-node-form';

describe('<NewNodeForm />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<NewNodeForm handleSubmit={spy}/>);
  })
});