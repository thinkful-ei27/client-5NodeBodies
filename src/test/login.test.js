import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../components/login';
import { Link } from 'react-router-dom';
import Login from "../components/login-form";
describe('<Login />', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });
  it('it does not crash if loggedIn = true', () => {
    const props = {
      loggedIn : true
    };
    shallow(<LoginPage props={props}/>);
  });
  it('contains a Link component', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.find(Link).length).toBe(1);
  });
  it('contains a Login component', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.find(Login).length).toBe(1);
  });
});
