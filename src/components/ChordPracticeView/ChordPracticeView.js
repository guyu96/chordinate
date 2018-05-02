import React, { Component } from 'react';
import Orientation from 'react-native-orientation';

import {
  Switch,
  View,
  Text,
  TextInput,
  Button,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import CountDownTimer from 'chordinate/src/components/CountDownTimer/CountDownTimer';
import BPMSlider from 'chordinate/src/components/BPMSlider/BPMSlider';

const initShrinkBarWidth = 500;
const defaultRepeat = 1;
const numberReg = /^\+?\d+$/;
const bpmIncreaseStep = 30;
const minBPM = 30;
const maxBPM = 240;
const defaultBPM = 100;

/*
  font scaling reference: https://stackoverflow.com/a/49532212
*/
SCREEN_WIDTH = Dimensions.get('window').width; // get current width
SCALE = 375; // constant, 375 is standard width of iphone 6 / 7 / 8

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / SCALE; // get ratio based on your standard scale
  const newSize = Math.round(ratio * SCREEN_WIDTH);
  return newSize;
}

export default class ChordPracticeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChord: 0,
      shrinkBarWidth: 0,
      bpm: defaultBPM,
      challengeBPM: defaultBPM,
      practiceSpeed: ChordPracticeView.bpmToSpeed(defaultBPM),
      startCountDown: false,
      challengeMode: false,
      totalRepeats: defaultRepeat,
      repeated: 0,
      disablePracticeButton: false,
    };
    this.sequenceLength = this.props.navigation.state.params.chordPracticeSequence.length;
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  static bpmToSpeed = (bpm) => {
    return 60000.0 / bpm;
  };

  BPMUpdateHandler = (newBPM) => {
    this.setState({
      bpm: newBPM,
      practiceSpeed: ChordPracticeView.bpmToSpeed(newBPM),
    });
  }

  setCountDown = (val) => {
    this.setState({
      startCountDown: val,
      repeated: 0
    });
    // if count down has finished, start practice
    if (val === false) {
      this.startPracticeHandler();
    }
  };

  toggleChallengeMode = (toggle) => {
    this.setState({
      challengeMode: toggle
    });
  }

  updateRepeat = (input) => {
    if (numberReg.test(input) === false) {
      alert("Please enter a valid, positive number");
    }
    this.setState({
      totalRepeats: parseInt(input)
    });
  }

  updateChallengeBPM = (prevBPM) => {
    return this.state.challengeMode? prevBPM + bpmIncreaseStep : prevBPM;
  };

  startPracticeHandler = () => {
    console.log(this.state.bpm + " " + this.state.practiceSpeed);
    this.setState({
      shrinkBarWidth: new Animated.Value(initShrinkBarWidth),
      disablePracticeButton: true
    })

    Animated.timing(
      this.state.shrinkBarWidth,
      {
        toValue: 0,
        duration: this.state.practiceSpeed,
      }
    ).start(() => {
      if (this.state.currentChord < this.sequenceLength - 1) {
        this.setState((prevState) => {
          return {
            currentChord: prevState.currentChord + 1,
          }
        });
        this.startPracticeHandler();  // recur for next chord
      } else {  // end of practice sequence
        let moreRepeats = this.state.repeated < this.state.totalRepeats - 1;
        this.setState((prevState) => {
          let newRepeated =  moreRepeats? prevState.repeated + 1 : this.state.totalRepeats;
          let newBPM = this.updateChallengeBPM(this.state.bpm);
          return {
            currentChord: 0,
            repeated: newRepeated,
            challengeBPM: newBPM,
            practiceSpeed: ChordPracticeView.bpmToSpeed(newBPM),
          }
        });
        if (moreRepeats) {
          this.startPracticeHandler();  // recur for next practice cycle
        } else {  // end of all practice cycles
          this.setState((prevState) => {
            return {
              disablePracticeButton: false,
              challengeBPM: prevState.bpm,
              practiceSpeed: ChordPracticeView.bpmToSpeed(prevState.bpm),
            }
          });
        }
      }
    });
  };

  render() {
    let hasPrevChord = this.state.currentChord > 0;
    let prevChordText = hasPrevChord? this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord - 1] : '';
    let hasNextChord = this.state.currentChord < this.sequenceLength - 1;
    let nextChordText = hasNextChord? this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord + 1] : '';

    return (
      <View style={styles.outerContainer}>
        { this.state.startCountDown?
          <CountDownTimer
            reStart={this.state.startCountDown}
            setCountDown={this.setCountDown}
          />
          : null
        }
        <View style={styles.controlContainer}>
          <View style={styles.bpmContainer}>
            <BPMSlider
              bpm={this.state.bpm}
              minBPM={minBPM}
              maxBPM={maxBPM}
              BPMHandler={this.BPMUpdateHandler}
            />
          </View>
          <View style={styles.challengeContainer}>
            <Text style={styles.challengeModeText}>Challenge</Text>
            <Switch
              onValueChange={(val) => this.toggleChallengeMode(val)}
              value={this.state.challengeMode}
            />
          </View>
          <View style={styles.repeatTextView}>
            <Text style={styles.text}>Repeat </Text>
            <TextInput
              style={styles.repeatTextInput}
              placeholder='1'
              onSubmitEditing={(event) => this.updateRepeat(event.nativeEvent.text)}
            />
          </View>
          <TouchableOpacity
            disabled={this.state.disablePracticeButton}
            onPress={() => this.setCountDown(true)}
            style={styles.button}
          >
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slideShowView}>
          <View style={{ ...previewChordStyle, opacity: hasPrevChord? 0.8: 0 }}>
            <Text style={styles.previewChordText}>
              {prevChordText}
            </Text>
          </View>
          <View style={styles.currentChord}>
            <Text style={styles.currentChordText}>
              {this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord]}
            </Text>
          </View>
          <View style={{ ...previewChordStyle, opacity: hasNextChord? 0.8: 0 }}>
            <Text style={styles.previewChordText}>
              {nextChordText}
            </Text>
          </View>
        </View>
        <View style={styles.shrinkBarContainer}>
          <Animated.View
            style={{
              ...shrinkBarStyle,
              width: this.state.shrinkBarWidth,
            }}
          >
          </Animated.View>
        </View>
      </View>
    )
  }
};

const shrinkBarStyle = {
  backgroundColor: 'gray',
  borderRadius: 1,
  height: 8
}

const previewChordStyle = {
  width: '27%',
  aspectRatio: 1,
  borderRadius: 10,
  backgroundColor: 'grey',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  slideShowView: {
    flex: 4,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  currentChord: {
    width: '37%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: 'grey',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  currentChordText: {
    color: 'white',
    fontSize: scaleFontSize(45),
  },

  previewChordText: {
    color: 'white',
    fontSize: scaleFontSize(30)
  },

  shrinkBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "space-around",
    marginBottom: 15,
    backgroundColor: '#e6e6e6',
  },

  bpmContainer: {
    width: '32%',
  },

  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
  },

	challengeModeText: {
    fontSize: scaleFontSize(12),
    marginRight: 5,
  },

  repeatTextView: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: scaleFontSize(12),
  },

  repeatTextInput: {
    width: '15%',
    fontSize: scaleFontSize(12),
  },

  button: {
    width: '13%',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#cccccc',
    padding: 8,
  },

});