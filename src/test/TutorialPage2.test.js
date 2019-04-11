import React from 'react';
import { shallow } from 'enzyme';
import { TutorialPage2 } from '../components/studentTutorialComponents/TutorialPage2';
import '../setupTests.js';

describe('<TutorialPage2 />', () => {
    it('Smoke Test', () => {
        shallow(<TutorialPage2 />);
    })
    it('Should call function onClick', () => {
        const spy = jest.fn();
        const wrapper = shallow(<TutorialPage2 dispatch={spy}/>);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        wrapper.find('button').at(2).simulate('click');
        expect(spy).toHaveBeenCalledTimes(3);
    })
})
