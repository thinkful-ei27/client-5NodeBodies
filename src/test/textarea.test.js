import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../components/textarea';

describe('<TextArea />', () => {
  it('renders without crashing', () => {
    const meta = {
      touched: false,
      error: false,
      warning: false
    };
    const input = {
      name: 'Example'
    };
    shallow(<TextArea meta={meta} input={input}/>);
  })
})