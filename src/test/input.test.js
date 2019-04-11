import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from '../components/input';
describe('<Input />', () => {
  it('renders without crashing if meta.touched and meta.error are true', () => {
    const metaProps = {
        touched: true,
        error: 'OH MY GOD CALL 911'
    };
    const inputProps = {
        name: 'Jordan is a Prince among Men'
    }
    shallow(<Input meta = {metaProps} input={inputProps}/>);
  });
  it('renders without crashing if meta.touched and meta.warning are true', () => {
      const metaProps = {
          touched: true,
          warning: "You don' goofed!"
      };
      const inputProps = {
        name: 'Jordan is a Prince among Men'
    }
      shallow(<Input meta = {metaProps} input={inputProps}/>)
  })
  it('it renders without crashing if metaprops are all false', () => {
    const metaProps = {
      touched: true,
      warning: "You don' goofed!",
    };
    const inputProps = {
      name: 'Jordan is a Prince among Men'
    };
    shallow(<Input meta={metaProps} input={inputProps}/>)
  });
});