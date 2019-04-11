import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store.js';
import Headerbar from '../components/headerbar.js';
import Login from '../components/login.js';
import LandingPage from '../components/landing-page';
import AdventureForm from '../components/newAdventure'
import Dashboard from '../components/dashboard'
import AdventureBuilder from '../components/adventureBuilder'
import StudentLanding from '../components/studentLandingPage'
import GraphContainer from '../components/graph-container'
import WrongTurn from '../components/wrongTurn'
import Home from '../components/home'
import CreateHeadNode from '../components/create-head-node'
import Footer from '../components/footer'
import AdventureInfo from '../components/adventureInfo'
import '../App.css';
import App from '../App';

// jest.mock('firebase/app');

test('app should load children', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(Headerbar)).toHaveLength(1);
  // expect(wrapper.find(LandingPage)).toHaveLength(1);
  // expect(wrapper.find(Login)).toHaveLength(1);
  // expect(wrapper.find(AdventureForm)).toHaveLength(1);
  // expect(wrapper.find(Dashboard)).toHaveLength(1);
  // expect(wrapper.find(AdventureForm)).toHaveLength(1);
  // expect(wrapper.find(AdventureBuilder)).toHaveLength(1);
  // expect(wrapper.find(StudentLanding)).toHaveLength(1);
  // expect(wrapper.find(GraphContainer)).toHaveLength(1);
  // expect(wrapper.find(WrongTurn)).toHaveLength(1);
  expect(wrapper.find(Home)).toHaveLength(1);
  // expect(wrapper.find(CreateHeadNode)).toHaveLength(1);
  // expect(wrapper.find(Footer)).toHaveLength(1);
  // expect(wrapper.find(AdventureInfo)).toHaveLength(1);
  // expect(wrapper.find(AdventureForm)).toHaveLength(1);
  // expect(wrapper.find(AdventureForm)).toHaveLength(1);
});

test('valid path should not redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(LandingPage)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});