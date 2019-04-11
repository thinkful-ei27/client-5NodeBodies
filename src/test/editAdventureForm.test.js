import React from 'react';
import { shallow } from 'enzyme';
import { EditAdventureForm } from '../components/editAdventureForm';

describe('<EditAdventureForm />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<EditAdventureForm handleSubmit={spy}/>);
  })
});