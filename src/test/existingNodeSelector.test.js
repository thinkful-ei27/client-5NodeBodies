import React from 'react';
import { shallow } from 'enzyme';
import { ExistingNodeSelector } from '../components/existingNodeSelector';

describe('<ExistingNodeSelector />', () => {
  it('renders without crashing', () => {
    const currentAdventure = {nodes: [1]};
    const currentNode = {id: 1};
    const spy = jest.fn();
    shallow(<ExistingNodeSelector currentAdventure={currentAdventure} currentNode={currentNode} dispatch={spy}/>);
  })
});