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
      chordProgression: {},
      activeChordKey: -1,
      nextChordKey: 0,
    };
  }

  chordChangeHandler = (rootName, qualityName) => {
    this.setState({
      activeRoot: rootName,
      activeQuality: qualityName,
      activeChordNotes: getChordNotes(rootName, qualityName)
    });
  }

  chordSelectHandler = (rootName, qualityName, activeChordKey) => {
    this.chordChangeHandler(rootName, qualityName);
    this.setState({
      activeChordKey: activeChordKey
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
          <View style={styles.innerContainer}>
            <View style={styles.buttons}>
              <Button
                onPress={this.chordAddHandler}
                title='Add Chord'
              />
              <Button
                //onPress={this.chordAddHandler}
                title='Remove Chord'
              />
              <Button
                //onPress={this.chordAddHandler}
                title='Practice!'
              />
            </View>
            <PianoChord style={styles.pianoChord} chordNotes={this.state.activeChordNotes}/>
          </View>
        </View>
        <ProgressionBar
          progression={this.state.chordProgression}
          selectHandler={this.chordSelectHandler}
        />
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
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
