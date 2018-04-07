import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordSelectionView from './src/components/ChordSelectionView/ChordSelectionView';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ChordSelectionView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
