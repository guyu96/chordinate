import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';

import { getChordNotes } from '../../chord.js';
import PickerView from '../PickerView/PickerView';
import PianoChord from '../PianoChord/PianoChord';
import ProgressionBar from '../ProgressionBar/ProgressionBar'

class ChordSelectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chordProgression: {
        0 : {
          root: '',
          quality: ''
        }
      },
      activeKey : 0,
      nextChordKey : 1,
      chordSequenceIndices: [],
      disableAddButton: true,
    };
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  // returns ana array of strings that represents the chords in the right order
  getChordArrayForRender = () => {
    var chords = this.state.chordSequenceIndices.map((indexVal) => {
      return `${this.state.chordProgression[indexVal].root} ${this.state.chordProgression[indexVal].quality}`;
    });
    // do not include last placeholder chord
    if (chords[chords.length - 1] === "") {
      chords.splice(-1 , 1);
    }
    return chords;
  };

  chordOrderChangeHandler = (chordIndices) => {
    this.setState({
      chordSequenceIndices: chordIndices
    });
  };

  chordChangeHandler = (rootName, qualityName) => {
    this.setState((prevState) => {
      const newProgression = { ...prevState.chordProgression };
      newProgression[prevState.activeKey] = {
        root: rootName,
        quality: qualityName
      };
      const emptyChord = (rootName === "" || qualityName === "");
      return {
        chordProgression: newProgression,
        disableAddButton: emptyChord,
      };
    });
  }

  chordSelectHandler = (key) => {
    this.setState({
      activeKey: key
    });
  }

  chordAddHandler = () => {
    this.setState((prevState) => {
      const newChord = {};
      newChord[prevState.nextChordKey] = { root : '', quality : '' };
      return {
        chordProgression : {
          ...prevState.chordProgression,
          ...newChord
        },
        chordSequenceIndices: [
          ...prevState.chordSequenceIndices,
          prevState.activeKey
        ],
        activeKey : prevState.nextChordKey,
        nextChordKey : prevState.nextChordKey + 1,
        disableAddButton: true
      };
    });
  }

  chordPracticeHandler = () => {
    this.props.navigation.navigate('Practice', {
      chordPracticeSequence: this.getChordArrayForRender(),
      elapseTime: 1000,
    })
  };

  render() {
    return (
      <View style={styles.chordSelectionView}>
        <View style={styles.topContainer}>
          <PickerView
            chordChangeHandler={this.chordChangeHandler}
            activeRoot={this.state.chordProgression[this.state.activeKey].root}
            activeQuality={this.state.chordProgression[this.state.activeKey].quality}
          />
          <View style={styles.innerContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                activeOpacity={ this.state.disableAddButton ? 1 : 0.7 }
                disabled={this.state.disableAddButton}
                onPress={this.chordAddHandler}
                style={styles.button}
              >
                <Text>Add Chord</Text>
              </TouchableOpacity>
              <Button
                onPress={ () => {} }
                title='Remove Chord'
              />
              <Button
                onPress={this.chordPracticeHandler}
                title='Practice!'
              />
            </View>
            <PianoChord
              rootName={this.state.chordProgression[this.state.activeKey].root}
              qualityName={this.state.chordProgression[this.state.activeKey].quality}
              style={styles.pianoChord}
            />
          </View>
        </View>
        <View style={styles.progressionBarContainer}>
          <ProgressionBar
            progression={this.state.chordProgression}
            selectHandler={this.chordSelectHandler}
            mostRecentChordSequence={this.chordOrderChangeHandler.bind(this)}
          />
        </View>
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
    flex: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },

  progressionBarContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6e6e6',
  }
});

export default withNavigation(ChordSelectionView);