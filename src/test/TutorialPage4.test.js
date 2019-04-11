import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests.js';
import { TutorialPage4 } from '../components/studentTutorialComponents/TutorialPage4';

describe('<TutorialPage4 />', () => {
    it('Smoke Test', () => {
        shallow(<TutorialPage4 />);
    })
    it('Should call function onClick', () => {
        const spy = jest.fn();
        const wrapper = shallow(<TutorialPage4 dispatch={spy}/>);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        expect(spy).toHaveBeenCalledTimes(2);
    })
})
