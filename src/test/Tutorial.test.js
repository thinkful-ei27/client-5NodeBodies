import React from 'react';
import { shallow } from 'enzyme';
import { Tutorial } from '../components/studentTutorialComponents/Tutorial';
import TutorialPage1 from '../components/studentTutorialComponents/TutorialPage1';
import TutorialPage2 from '../components/studentTutorialComponents/TutorialPage2';
import TutorialPage3 from '../components/studentTutorialComponents/TutorialPage3';
import TutorialPage4 from '../components/studentTutorialComponents/TutorialPage4';
import '../setupTests.js';

describe('<Tutorial />', () => {
    it('Smoke Test', () => {
        shallow(<Tutorial />);
    });
    it('if tutorialPageNumber === 0, it should render TutorialPage1', () => {
        const wrapper = shallow(<Tutorial tutorialPageNumber={0} />);
        expect(wrapper.find(TutorialPage1).length).toBe(1);
    });
    it('if tutorialPageNumber === 1, it should render TutorialPage2', () => {
        const wrapper = shallow(<Tutorial tutorialPageNumber={1} />);
        expect(wrapper.find(TutorialPage2).length).toBe(1);
    });
    it('if tutorialPageNumber === 2, it should render TutorialPage3', () => {
        const wrapper = shallow(<Tutorial tutorialPageNumber={2} />);
        expect(wrapper.find(TutorialPage3).length).toBe(1);
    });
    it('if tutorialPageNumber === 3, it should render TutorialPage4', () => {
        const wrapper = shallow(<Tutorial tutorialPageNumber={3} />);
        expect(wrapper.find(TutorialPage4).length).toBe(1);
    });
})
