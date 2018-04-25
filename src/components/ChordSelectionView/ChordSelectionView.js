import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
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
      ChordSequenceIndices:[]
    };
  }



  // returns ana array of strings that represents the chords in the right order
  getChordArrayForRender = (chordIndices, chordList) => {
    return chordIndices.map(
        function(indexVal){
            return `${chordList[indexVal].root} ${chordList[indexVal].quality}`;
        }
    )
  };


  chordOrderChangeHandler = (chordIndices) => {
    this.setState(
        {ChordSequenceIndices:chordIndices}
    );
  };


  chordChangeHandler = (rootName, qualityName) => {
    this.setState((prevState) => {
      const newProgression = { ...prevState.chordProgression };
      newProgression[prevState.activeKey] = {
        root: rootName,
        quality: qualityName
      };
      return { chordProgression : newProgression };
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
        activeKey : prevState.nextChordKey,
        nextChordKey : prevState.nextChordKey + 1
      };
    });
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

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
              <Button
                onPress={this.chordAddHandler}
                title='Add Chord'
              />
              <Button
                onPress={ () => {} }
                title='Remove Chord'
              />
              <Button
                onPress={ () => {this.props.navigation.navigate('Practice', {chordPracticeSequence: this.getChordArrayForRender(this.state.ChordSequenceIndices, this.state.chordProgression)})} }
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

  progressionBarContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6e6e6',
  }
});

export default withNavigation(ChordSelectionView);