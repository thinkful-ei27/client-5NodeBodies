import React from 'react';
import { shallow, mount } from 'enzyme';
import { AdventureBuilder } from '../components/adventureBuilder';
import NewNodeForm from '../components/new-node-form';
import ExistingNodeSelector from '../components/existingNodeSelector';
import GraphContainer from '../components/graph-container';
import CurrentNodeBrancher from '../components/current-node-brancher';


describe('<AdventureBuilder />', () => {
  it('renders without crashing', () => {
    const currentAdventure = {head: 1, nodes: []};
    const match = {params: 1};
    const dispatch = jest.fn();
    shallow(<AdventureBuilder currentAdventure={currentAdventure} match={match} dispatch={dispatch}/>);
  });
  it('triggers dispatch when mounting', () => {
    const props = {
      dispatch: jest.fn(),
      currentAdventure: {head: 1, nodes: []},
      match: {params: 1}
    };
    const wrapper = shallow(<AdventureBuilder {...props} />)
    wrapper.instance().componentDidMount();
    expect(props.dispatch).toHaveBeenCalled();
  })
  it('should contain <NewNodeForm /> if parentInt exists', () => {
    const props = {
      dispatch: jest.fn(),
      currentAdventure: {head: 1, nodes: []},
      match: {params: 1},
      parentInt: 1
    };
    const wrapper = shallow(<AdventureBuilder {...props} />);
    expect(wrapper.find(NewNodeForm).length).toBe(1);
  });
  it('should contain <ExistingNodeSelector /> ONLY if parentInt and useExistingNode exist', () => {
    const props = {
      dispatch: jest.fn(),
      currentAdventure: {head: 1, nodes: []},
      match: {params: 1},
      parentInt: 1,
      useExistingNode: true
    };
    const wrapper = shallow(<AdventureBuilder {...props} />);
    expect(wrapper.find(NewNodeForm).length).toBe(0);
    expect(wrapper.find(ExistingNodeSelector).length).toBe(1);
  })
  it('should contain <GraphContainer /> and <CurrentNodeBrancher />', () => {
    const props = {
      dispatch: jest.fn(),
      currentAdventure: {head: 1, nodes: []},
      match: {params: 1},
    };
    const wrapper = shallow(<AdventureBuilder {...props} />);
    expect(wrapper.find(GraphContainer).length).toBe(1);
    expect(wrapper.find(CurrentNodeBrancher).length).toBe(1);
  })
});