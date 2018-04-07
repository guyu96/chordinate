import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PickerView from './src/components/PickerView/PickerView';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <PickerView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
