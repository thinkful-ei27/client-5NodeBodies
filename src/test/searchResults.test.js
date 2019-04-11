import React from 'react';
import { shallow } from 'enzyme';
import { SearchResults } from '../components/searchResults';

describe('<SearchResults />', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    shallow(<SearchResults />)
  })
})