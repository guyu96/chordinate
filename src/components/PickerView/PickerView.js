import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordPicker from '../ChordPicker/ChordPicker';
import { noteNames, qualityNames } from '../../chord';

export default class PickerView extends Component {
  state = {
    chordSelected: 0,
    qualitySelected: 0,
  };

  chordSelectHandler = (index) => {
    this.setState({
      chordSelected: index,
    });
  };

  qualitySelectHandler = (index) => {
    this.setState({
      chordSelected: index,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ChordPicker
          selectedIndex={this.state.chordSelected}
          selectionList={noteNames}
          onItemSelected={this.chordSelectHandler}
        />
        <ChordPicker
          selectedIndex={this.state.qualitySelected}
          selectionList={qualityNames}
          onItemSelected={this.qualitySelectHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
