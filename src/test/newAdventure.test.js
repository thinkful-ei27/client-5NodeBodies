import React from 'react';
import { shallow } from 'enzyme';
import { AdventureForm } from '../components/newAdventure';

describe('<AdventureForm />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<AdventureForm handleSubmit={spy}/>);
  })
});