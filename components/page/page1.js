import React from 'react';
import { View, Text } from 'react-native';

export default class Page1 extends React.Component {
  render() {
    return <View style={{flex: 1}}>
      <Text style={{paddingTop: 30}} onPress={this.onPressHandle}>page1</Text>
    </View>
  }
  onPressHandle = () => {
    const { navigateTo } = this.props;
    navigateTo('page2');
  }
};
