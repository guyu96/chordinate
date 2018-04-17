import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Orientation from 'react-native-orientation';

import { getChordNotes } from '../../chord.js';
import PickerView from '../PickerView/PickerView';
import PianoChord from '../PianoChord/PianoChord';
import ProgressionBar from '../ProgressionBar/ProgressionBar'

export default class ChordSelectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoot: '',
      activeQuality: '',
      activeChordNotes: [],
      nextChordKey: 0,
      chordProgression: {}
    };
  }

  chordChangeHandler = (rootName, qualityName) => {
    this.setState({
      activeRoot: rootName,
      activeQuality: qualityName,
      activeChordNotes: getChordNotes(rootName, qualityName)
    });
  }

  chordAddHandler = () => {
    const newChord = {};
    newChord[this.state.nextChordKey] = {
      root: this.state.activeRoot,
      quality: this.state.activeQuality
    };
    this.setState((prevState) => {
      return {
        nextChordKey: prevState.nextChordKey + 1,
        chordProgression : {
          ...prevState.chordProgression,
          ...newChord
        }
      }
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
          <PianoChord chordNotes={this.state.activeChordNotes}/>
          <Button
            onPress={this.chordAddHandler}
            title='Add Chord'
          />
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
