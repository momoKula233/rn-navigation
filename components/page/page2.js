import React from 'react';
import { View, Text } from 'react-native';

export default class Page2 extends React.Component {
  render() {
    return <View style={{flex: 1, backgroundColor: '#ccc'}}>
      <Text style={{paddingTop: 30}} onPress={this.onPressHandle}>page2</Text>
    </View>
  }
  onPressHandle = () => {
    const { navigatePop } = this.props;
    navigatePop();
  }
}