/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';


import Dashboard from './App/Components/Dashboard';
import Main from './App/Components/Main';
import Badge from './App/Components/Badge';
import Notas from './App/Components/Notas';
import Profile from './App/Components/Profile';
import Repos from './App/Components/Repos';
import ViewWeb from './App/Components/ViewWeb';


const routes = [
  { title: 'Github Notetaker',component: Main},
  { title: 'Bio',component: Dashboard },
  { title: 'Perfil', component: Profile },
  { title: 'Notas', component: Notas },
  { title: 'Web View', component: ViewWeb },
  { title: 'Repositorios', component: Repos},
  { title: 'Pagina', component: Repos },
];

export default class gitmaker extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Github Notetaker', index: 0 }}
        renderScene={(route, navigator) => {
          const routeFound = (routes.find( r => route.title.startsWith(r.title) ) || {component: Main}).component;
          return React.createElement(routeFound, {navigator, ...route.passProps});
        }}
        style={{flex:1}}
      />
    );
  }
}



AppRegistry.registerComponent('gitmaker', () => gitmaker);
