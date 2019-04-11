import React from 'react';
import {shallow, mount} from 'enzyme';
import { TutorialPage1 } from '../components/studentTutorialComponents/TutorialPage1';
import '../setupTests.js';

describe('<RatePain />', () => {
    it('Smoke Test', () => {
        shallow(<TutorialPage1 />);
    })
    it('Should call function onClick', () => {
        const spy = jest.fn();
        const wrapper = shallow(<TutorialPage1 dispatch={spy}/>);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        expect(spy).toHaveBeenCalledTimes(2);
    })
})
