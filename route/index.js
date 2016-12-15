import React, { PropTypes } from 'react';
import { NavigationExperimental, ScrollView, Text, View } from 'react-native';

const { 
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
  Header: NavigationHeader,
 } = NavigationExperimental;


export const routeReducer = (state, action, key) => {
  if (state ==='initial') {
    return {
      index: 0,
      routes: [{key: 'page1'}],
    };
  }
  switch (action) {
    case 'push':
      const route = { key };
      return NavigationStateUtils.push(state, route);
    case 'pop':
      return NavigationStateUtils.pop(state);
  }
  return state;
}
