import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../components/dashboard';
import sinon from 'sinon'

describe('<Dashboard />', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />);
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <Dashboard onButtonClick={onButtonClick} />
    ));
    wrapper.find('.create-adventure').simulate('click');
    console.log(onButtonClick.calledOnce)
  });
});
