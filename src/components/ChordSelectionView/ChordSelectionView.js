import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Switch, StyleSheet} from 'react-native';
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
    this.state = {
      chordProgression: {
        0: {
          root: '',
          quality: '',
          active: true
        }
      },
      activeKey: 0,
      nextChordKey: 1,
      chordSequenceIndices: [],
      bpm: defaultBPM,
      disableAddButton: true,
      disableRemoveButton: true,
      gameMode: false,
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
    var chords = this.state.chordSequenceIndices.map((indexVal) => {
      return `${this.state.chordProgression[indexVal].root} ${this.state.chordProgression[indexVal].quality}`;
    });
    // do not include last placeholder chord
    if (chords[chords.length - 1] === '') {
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
      return {
        chordProgression: newProgression,
        activeKey: key,
        disableRemoveButton: this.state.chordProgression[key].root === '' || this.state.chordProgression[key].quality === ''
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
    this.setState((prevState) => {
      // do not remove empty placeholder chord
      if (prevState.chordProgression[prevState.activeKey].root === '' || prevState.chordProgression[prevState.activeKey].quality === '') {
        return prevState;
      }
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

  chordPracticeHandler = () => {
    if (this.state.chordSequenceIndices.length == 0) {
      alert("Please select a valid chord sequence to practice.");
      return;
    }
    this.props.navigation.navigate('Practice', {
      chordPracticeSequence: this.getChordArrayForRender(),
      elapseTime: 60000.0 / this.state.bpm, // 60,000 ms
    })
  };

  toggleGameMode = (toggle) => {
    this.setState({
      gameMode: toggle
    });
  }

  render() {
    return (
      <View style={styles.chordSelectionView}>
        <View style={styles.outerContainer}>
          <View style={styles.innerLeftContainer}>
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

          <View style={styles.innerRightContainer}>
            <View style={styles.buttons}>
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
            <View style={styles.gameModeContainer}>
              <Text style={styles.gameModeText}>Game Mode</Text>
              <Switch
                onValueChange={(val) => this.toggleGameMode(val)}
                value={this.state.gameMode}
              />
            </View>

            <View style={styles.pianoChordContainer}>
              <PianoChord
                rootName={this.state.chordProgression[this.state.activeKey].root}
                qualityName={this.state.chordProgression[this.state.activeKey].quality}
              />
            </View>

          </View>
        </View>

        <View style={styles.progressionBarContainer}>
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

  outerContainer: {
    flex: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerLeftContainer: {
    width: '45%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  innerRightContainer: {
    width: '55%',
    height: '100%',
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 8,
    margin: 5
  },
  buttonText: {
    fontSize: 17
  },

  gameModeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: "center"
  },
	gameModeText: {
    marginRight: 5,
  },

  pianoChordContainer: {
    flex: 3
  },

  progressionBarContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6e6e6',
  },
});

export default withNavigation(ChordSelectionView);
