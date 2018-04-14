import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Orientation from 'react-native-orientation';

import { getChordNotes } from '../../chord.js';
import PickerView from '../PickerView/PickerView';
import PianoChord from '../PianoChord/PianoChord';

export default class ChordSelectionView extends Component {
  state = {
    chordNotes: []
  };

  chordChangeHandler = (rootName, qualityName) => {
    this.setState({
      chordNotes: getChordNotes(rootName, qualityName)
    });
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  render() {
    return (
      <View style={styles.chordSelectionViewStyle}>
        <PickerView chordChangeHandler={this.chordChangeHandler}/>
        <PianoChord chordNotes={this.state.chordNotes}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chordSelectionViewStyle: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

