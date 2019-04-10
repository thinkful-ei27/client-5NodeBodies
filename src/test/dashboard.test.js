import React from 'react';
import { shallow, mount } from 'enzyme';
import { Dashboard } from '../components/dashboard';

describe('<Dashboard />', () => {
  it('renders without crashing when loading', () => {
    const props = {
      loading: true,
      dispatch: jest.fn()
    }
    shallow(<Dashboard {...props} />);
  })
  it('renders without crashing when not loading', () => {
    const props = {
      loading: false,
      adventures: [],
      dispatch: jest.fn()
    }
    shallow(<Dashboard {...props} />);
  })
  it('triggers dispatch when mounting', () => {
    const props = {
      loading: false,
      adventures: [],
      dispatch: jest.fn()
    }
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.instance().componentDidMount();
    expect(props.dispatch).toHaveBeenCalled();
  })
  it('triggers toggleOnboardingClick when we click on a button', () => {
    const props = {
      loading: false,
      onboarding: true,
      adventures: [],
      dispatch: jest.fn()
    }
    const mock = jest.spyOn(Dashboard.prototype, 'toggleOnboardingClick');
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.find('.close-onboarding').simulate('click');
    expect(mock).toHaveBeenCalled();
  })

});