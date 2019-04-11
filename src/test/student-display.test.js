import React from 'react';
import { shallow } from 'enzyme';
import { StudentDisplay } from '../components/student-display';

describe('<StudentDisplay />', () => {
  it('renders without crashing', () => {
    // const spy = jest.fn();
    const adventure = {
        title: 'Example'
    }
    shallow(<StudentDisplay adventure={adventure} />);
  })
})