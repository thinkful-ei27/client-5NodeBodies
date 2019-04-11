import React from 'react';
import { shallow } from 'enzyme';
import { TutorialPage3 } from '../components/studentTutorialComponents/TutorialPage3';
import '../setupTests.js';

describe('<TutorialPage3 />', () => {
    it('Smoke Test', () => {
        shallow(<TutorialPage3 />);
    })
    it('Should call function onClick', () => {
        const spy = jest.fn();
        const wrapper = shallow(<TutorialPage3 dispatch={spy}/>);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        wrapper.find('button').at(2).simulate('click');
        expect(spy).toHaveBeenCalledTimes(3);
    })
})
