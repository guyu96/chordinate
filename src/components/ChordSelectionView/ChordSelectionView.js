import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Orientation from 'react-native-orientation';
import { withNavigation } from 'react-navigation';

import { getChordNotes } from 'chordinate/src/chord.js';
import PickerView from 'chordinate/src/components/PickerView/PickerView';
import PianoChord from 'chordinate/src/components/PianoChord/PianoChord';
import ProgressionBar from 'chordinate/src/components/ProgressionBar/ProgressionBar';
import BPMSlider from 'chordinate/src/components/BPMSlider/BPMSlider';

const minBPM = 30;
const maxBPM = 240;
const defaultBPM = 100;

class ChordSelectionView extends Component {
  constructor(props) {
    super(props);

    if (this.props.navigation.state.params) {
      this.state = JSON.parse(this.props.navigation.state.params);
      return;
    }
    this.state = {
      chordProgression: {
        0: {
          root: '',
          quality: '',
          active: true
        }
      },
      activeKey: 0,
      placeholderKey: 0,
      nextChordKey: 1,
      chordSequenceIndices: [],
      bpm: defaultBPM,
      disableAddButton: true,
      disableRemoveButton: true,
      sequenceName: ''
    };
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  BPMUpdateHandler = (newBPM) => {
    this.setState({
      bpm: newBPM
    });
  }

  // returns ana array of strings that represents the chords in the right order
  getChordArrayForRender = () => {
    return this.state.chordSequenceIndices
    .filter((indexVal) => {
      // filter the placeholder chord
      return indexVal !== this.state.placeholderKey;
    })
    .map((indexVal) => {
      return `${this.state.chordProgression[indexVal].root} ${this.state.chordProgression[indexVal].quality}`;
    });
  };

  chordOrderChangeHandler = (chordIndices) => {
    this.setState({
      chordSequenceIndices: chordIndices
    });
  };

  chordChangeHandler = (rootName, qualityName) => {
    this.setState((prevState) => {
      const newProgression = { ...prevState.chordProgression };
      newProgression[prevState.activeKey].root = rootName;
      newProgression[prevState.activeKey].quality = qualityName;
      const chordIsIncomplete = rootName === '' || qualityName === '';
      return {
        chordProgression: newProgression,
        disableAddButton: chordIsIncomplete,
      };
    });
  }

  chordSelectHandler = (key) => {
    this.setState((prevState) => {
      const newProgression  = { ...prevState.chordProgression };
      newProgression[prevState.activeKey].active = false;
      newProgression[key].active = true;
      const chordIsIncomplete = this.state.chordProgression[key].root === '' || this.state.chordProgression[key].quality === '';
      return {
        chordProgression: newProgression,
        activeKey: key,
        // disable remove button if current chord is placeholder chord
        disableRemoveButton: key === this.state.placeholderKey,
        // disable add button if current chord is not placeholder chord or is incomplete
        disableAddButton: key !== this.state.placeholderKey || chordIsIncomplete,
      };
    });
  }

  chordAddHandler = () => {
    this.setState((prevState) => {
      const newProgression = { ...prevState.chordProgression };
      newProgression[prevState.activeKey].active = false;
      newProgression[prevState.nextChordKey] = {
        root : '',
        quality : '',
        active: true
      };
      return {
        chordProgression: newProgression,
        chordSequenceIndices: [
          ...prevState.chordSequenceIndices,
          prevState.activeKey
        ],
        activeKey: prevState.nextChordKey,
        placeholderKey: prevState.nextChordKey,
        nextChordKey: prevState.nextChordKey + 1,
        disableAddButton: true
      };
    });
  }

  removeChordByKey = (prevProgression, deleteKey) => {
    // Object.keys returns a list of strings, so we need parseInt
    return Object.keys(prevProgression)
      .filter(key => parseInt(key) !== deleteKey)
      .reduce((newProgression, current) => {
        newProgression[current] = prevProgression[current];
        return newProgression;
      }, {});
  }

  removeChordIndex = (prevIndices, prevActiveKey) => {
    let arr = prevIndices.filter(e => {
      return e !== prevActiveKey;
    });
    return arr;
  }

  chordRemoveHandler = () => {
    // safety check
    if (this.state.activeKey == this.state.placeholderKey) {
      return;
    }
    this.setState((prevState) => {
      const newProgression = this.removeChordByKey(prevState.chordProgression, prevState.activeKey);
      newProgression[prevState.nextChordKey - 1].active = true;
      return {
        chordProgression: newProgression,
        chordSequenceIndices: this.removeChordIndex(prevState.chordSequenceIndices, prevState.activeKey),
        activeKey: prevState.nextChordKey - 1, // move activeKey to empty placeholder
        disableRemoveButton: true, // disable remove button because we are focusing on placeholder chord
      }
    });
  }

  // save the sequence with its name as its key, and then go into practice mode
  chordPracticeHandler = async() => {
    if (this.state.chordSequenceIndices.length == 0) {
      alert('Please select a valid chord sequence to practice.');
      return;
    }
    if (!this.state.sequenceName){
      alert('Please give this chord sequence a valid name');
      return;
    }
    // store this progression's state
    AsyncStorage.setItem(this.state.sequenceName, JSON.stringify(this.state));
    this.props.navigation.navigate('Practice', {
      chordPracticeSequence: this.getChordArrayForRender(),
      bpm: this.state.bpm,
    })
  };

  render() {
    return (
      <View style={styles.chordSelectionView}>
        <View style={styles.topContainer}>
          <View style={styles.topLeftContainer}>
            <TextInput
              style={styles.progressionNameInput}
              placeholder='Chord Progression Name'
              onChangeText={ (input) => { this.setState({ sequenceName: input }); } }
            />
          </View>
          <View style={styles.topRightContainer}>
            <TouchableOpacity
              disabled={this.state.disableAddButton}
              onPress={this.chordAddHandler}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Chord</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.disableRemoveButton}
              onPress={this.chordRemoveHandler}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Remove Chord</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chordPracticeHandler}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Practice</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.midLeftContainer}>
            <BPMSlider
              bpm={this.state.bpm}
              minBPM={minBPM}
              maxBPM={maxBPM}
              BPMHandler={this.BPMUpdateHandler}
            />
            <PickerView
              chordChangeHandler={this.chordChangeHandler}
              activeRoot={this.state.chordProgression[this.state.activeKey].root}
              activeQuality={this.state.chordProgression[this.state.activeKey].quality}
            />
          </View>
          <View style={styles.midRightContainer}>
            <PianoChord
              rootName={this.state.chordProgression[this.state.activeKey].root}
              qualityName={this.state.chordProgression[this.state.activeKey].quality}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ProgressionBar
            progression={this.state.chordProgression}
            selectHandler={this.chordSelectHandler}
            mostRecentChordSequence={this.chordOrderChangeHandler}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
    topLeftContainer: {
      flex: 2
    },
      progressionNameInput: {
        height: '100%',
        width: '100%'
      },
    topRightContainer: {
      flex: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
      button: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 8,
        margin: 5
      },
        buttonText: {
          fontSize: 14,
          textAlign: 'center'
        },

  midContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
    midLeftContainer: {
      flex: 2
    },
    midRightContainer: {
      flex: 3,
    },

  bottomContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default withNavigation(ChordSelectionView);
