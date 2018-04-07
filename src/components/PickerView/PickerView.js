import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordPicker from '../ChordPicker/ChordPicker';

export default class PickerView extends Component {
  state = {
    chordSelected: 0,
    chordNames: ["C", "A", "D", "E"],
    qualitySelected: 0,
    qualityNames: ["major", "minor"],
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
          selectionList={this.state.chordNames}
          onItemSelected={this.chordSelectHandler}
        />
        <ChordPicker
          selectedIndex={this.state.qualitySelected}
          selectionList={this.state.qualityNames}
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
