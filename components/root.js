import React, { PropTypes } from 'react';
import { View, NavigationExperimental, Text, ScrollView, Animated, StyleSheet, Easing } from 'react-native';

import { routeReducer, updateRouteState, createScene } from '../route';

import Page1 from '../components/page/page1';
import Page2 from '../components/page/page2';

const { 
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  Transitioner: NavigationTransitioner,
 } = NavigationExperimental;


export default class Root extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = routeReducer('initial');
  }
  render() {
    return <Navigator onNavigate={this._onNavigationChange} routeState={this.state}  />
  }
  _onNavigationChange = (action, key) => {
    const state = routeReducer(this.state, action, key)
    if(state === this.state) {
      return false
    }
    this.setState(state);
    return true
  }
}

class Navigator extends React.Component {
  render() {
    const { routeState } = this.props;
    const { index } = routeState;
    return (
        <NavigationTransitioner
          navigationState={routeState}
          configureTransition={this._configureTransition}
          render={transitionProps => this._render(transitionProps)}
        />
    );
  }
  _render = (transitionProps) => {
    const { scenes } = transitionProps;
    return scenes.map(scene => {
      const nextProps = {
        ...transitionProps,
        scene,
      };
    return this._renderScene(nextProps);
    });
  }
  _renderScene = (sceneProps) => {
    const { scene } = sceneProps;
    return <Router {...sceneProps} key={`${scene.key}`} onNavigate={this.props.onNavigate} />
  }
  _configureTransition = () => {
    const easing = Easing.inOut(Easing.ease);
    return {
      duration: 300,
      easing,
    };
  }
};

class Router extends React.Component {
  styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#E9E9EF',
      bottom: 0,
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 10,
      top: 0,
    }
  })
  constructor(props) {
    super(props);
    const { onNavigate } = props;
    this._navigateTo = onNavigate.bind(this, 'push');
    this._navigateBack = onNavigate.bind(this, 'pop');
    this.routeHandle = {
      navigateTo: onNavigate.bind(null, 'push'),
      navigatePop: onNavigate.bind(null, 'pop'),
    };
  }
  render() {
    const { scene } = this.props;
    let Route;
    const { key } = scene;
    switch (key) {
      case 'scene_page1':
        Route = Page1;
        break;
      case 'scene_page2':
        Route = Page2;
        break;
    }
    return <Animated.View style={[this.styles.wrapper, this.animation()]}>
      <Route {...this.routeHandle} key={`${scene.key}`} {...this.props} />
    </Animated.View>;
  }
  animation =  () => {
    const { layout, position, scene } = this.props;
    const { index } = scene;
    const inputRange = [index - 1, index, index + 1];
    const width = layout.initWidth;
    const translateX = position.interpolate({
      inputRange,
      outputRange: ([width, 0, -10]),
    });
    return {
      transform: [
        { translateX },
      ],
    };
  }
};
