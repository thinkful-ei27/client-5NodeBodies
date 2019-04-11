import React from 'react';
import { shallow } from 'enzyme';
import { CurrentNodeBrancher } from '../components/current-node-brancher';
import UpdateNodeForm from '../components/update-node-form';

describe('<CurrentNodeBrancher />', () => {
  it('renders without crashing', () => {
    const props = {currentNode: {}}
    shallow(<CurrentNodeBrancher {...props}/>);
  });
  it('Should return UpdateNodeForm if currentNode has no Answers and showUpdate is true', () => {
    const props = {currentNode: {}, showUpdate: true};
    const wrapper = shallow(<CurrentNodeBrancher {...props} />);
    expect(wrapper.find(UpdateNodeForm).length).toBe(1);
  })
});