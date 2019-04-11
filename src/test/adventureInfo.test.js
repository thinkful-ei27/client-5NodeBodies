import React from 'react';
import { shallow } from 'enzyme';
import { AdventureInfo } from '../components/adventureInfo';
import Analytics from '../components/analytics';

describe('<AdventureInfo />', () => {
  it('renders without crashing', () => {
    const props = {
      match: {params: 1},
      dispatch: jest.fn()
    }
    shallow(<AdventureInfo {...props} />);
  });
  // it('should contain the <Analytics /> if showAnalytics = true', () => {
  //   const props = {
  //     match: {params: 1},
  //     dispatch: jest.fn(),
  //     showAnalytics: true,
  //     adventure: true,
  //     isEditing: false
  //   }
  //   const wrapper = shallow(<AdventureInfo {...props} />);
  //   expect(wrapper.find(Analytics).length).toBe(1);
  // })
});