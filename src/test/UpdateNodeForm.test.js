import React from 'react';
import { shallow } from 'enzyme';
import { UpdateNodeForm } from '../components/update-node-form';

describe('<UpdateNodeForm />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    const currentNode = {
        title: 'Exists'
    };
    shallow(<UpdateNodeForm handleSubmit={spy} currentNode={currentNode} />);
  })
})