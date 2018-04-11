import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordPicker from '../ChordPicker/ChordPicker';
import { noteNames, qualityNames } from '../../chord';

export default class PickerView extends Component {
  state = {
    rootSelected: 0,
    qualitySelected: 0,
  };

  chordChangeHelper = () => {
    this.props.chordChangeHandler(
      noteNames[this.state.rootSelected],
      qualityNames[this.state.qualitySelected]
    );
  }

  chordSelectHandler = (index) => {
    this.setState(
      { rootSelected: index },
      () => { this.chordChangeHelper() }
    );
  };

  qualitySelectHandler = (index) => {
    this.setState(
      { rootSelected: index },
      () => { this.chordChangeHelper() }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ChordPicker
          selectedIndex={this.state.rootSelected}
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
