import React from 'react';
import { shallow } from 'enzyme';
import RegisterForm from '../components/registration';
import '../setupTests.js';
import { Form } from 'redux-form';

describe('<RegisterForm />', () => {
  it('renders without crashing', () => {
    shallow(<RegisterForm />);
  });
  // it('Should call function onSubmit', () => {
  //   const spy = jest.fn();
  //   const wrapper = shallow(<RegisterForm dispatch={spy}/>);
  //   wrapper.find('button').at(0).simulate('click');
  //   expect(spy).toHaveBeenCalledTimes(1);
  // })


  // //Why does the below test fail?
  // it('should contain 1 <Form /> component', () => {
  //   const wrapper = shallow(<RegisterForm />);
  //   expect(wrapper.find(Form).length).toBe(1);
  // })

  /*
    it('Should call function onClick', () => {
        const spy = jest.fn();
        const wrapper = shallow(<TutorialPage1 dispatch={spy}/>);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        expect(spy).toHaveBeenCalledTimes(2);
    })
  */
});