import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Orientation from 'react-native-orientation';

import { getChordNotes } from '../../chord.js';
import PickerView from '../PickerView/PickerView';
import PianoChord from '../PianoChord/PianoChord';
import ProgressionBar from '../ProgressionBar/ProgressionBar'

export default class ChordSelectionView extends Component {
  state = {
    chordNotes: [],
    chordProgression:  {
      0: { text: 'Db'},
      1: { text: 'G'},
      2: { text: 'C'}
    }
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
      <View style={styles.chordSelectionView}>
        <View style={styles.topContainer}>
          <PickerView chordChangeHandler={this.chordChangeHandler}/>
          <PianoChord chordNotes={this.state.chordNotes}/>
        </View>
        <ProgressionBar progression={this.state.chordProgression} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chordSelectionView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topContainer: {
    flex: 1
  }
});
