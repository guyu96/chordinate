import React, { Component } from 'react';
import Orientation from 'react-native-orientation';

import { Switch, View, Text, TextInput, Button, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import CountDownTimer from 'chordinate/src/components/CountDownTimer/CountDownTimer';

const initShrinkBarWidth = 500;
const defaultRepeat = 1;
const numberReg = /^\+?\d+$/;

export default class ChordPracticeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChord: 0,
      shrinkBarWidth: 0,
      practiceSpeed: this.props.navigation.state.params.elapseTime,
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

  startPracticeHandler = () => {
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
          return {
            currentChord: 0,
            repeated: newRepeated
          }
        });
        if (moreRepeats) {
          this.startPracticeHandler();  // recur for next practice cycle
        } else {  // end of all practice cycles
          this.setState({
            disablePracticeButton: false
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
          <View style={styles.challengeContainer}>
            <Text style={styles.challengeModeText}>Challenge Mode</Text>
            <Switch
              onValueChange={(val) => this.toggleChallengeMode(val)}
              value={this.state.challengeMode}
            />
          </View>
          <TextInput
            style={styles.repeatText}
            placeholder="Repeat times"
            onSubmitEditing={(event) => this.updateRepeat(event.nativeEvent.text)}
          />
          <TouchableOpacity
            disabled={this.state.disablePracticeButton}
            onPress={() => this.setCountDown(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Practice</Text>
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
    fontSize: 90
  },

  previewChordText: {
    color: 'white',
    fontSize: 50
  },

  shrinkBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: "center"
  },

  challengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },

	challengeModeText: {
    marginRight: 5,
  },

  repeatText: {
    marginLeft: 10,
    marginRight: 10,
    width: '30%',
    fontSize: 18,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 8,
    margin: 5
  },

});