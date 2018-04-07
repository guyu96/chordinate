import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Orientation from 'react-native-orientation';

import PickerView from '../PickerView/PickerView';

export default class ChordSelectionView extends Component {

  componentDidMount() {
      Orientation.lockToLandscape();
  }

  render() {
    return (
      <View style={styles.chordSelectionViewStyle}>
        <PickerView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chordSelectionViewStyle: {
    borderWidth: 5,
    width: "50%",
    height: "80%",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

