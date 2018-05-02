import React, { Component } from 'react';
import Orientation from 'react-native-orientation';

import { StyleSheet, View, Text, Button, Animated } from 'react-native';
import CountDownTimer from 'chordinate/src/components/CountDownTimer/CountDownTimer';

const initShrinkBarWidth = 500;
var sequenceLength;

export default class ChordPracticeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChord: 0,
      shrinkBarWidth: 0,
      practiceSpeed: this.props.navigation.state.params.elapseTime,
      startCountDown: false,
    };
    sequenceLength = this.props.navigation.state.params.chordPracticeSequence.length;
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  setCountDown = (val) => {
    this.setState({
      startCountDown: val,
    });
    // if count down has finished, start practice
    if (val === false) {
      this.startPracticeHandler();
    }
  };

  startPracticeHandler = () => {
    this.setState({
      shrinkBarWidth: new Animated.Value(initShrinkBarWidth)
    })

    Animated.timing(
      this.state.shrinkBarWidth,
      {
        toValue: 0,
        duration: this.state.practiceSpeed,
      }
    ).start(() => {
      if (this.state.currentChord < sequenceLength - 1) {
        this.setState((prevState) => {
          return {
            currentChord: prevState.currentChord + 1,
          }
        });
        this.startPracticeHandler();  // recur for next chord
      } else {  // end of practice sequence
        this.setState({
          currentChord: 0,
        });
      }
    });
  };

  render() {
    let hasPrevChord = this.state.currentChord > 0;
    let prevChordText = hasPrevChord? this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord - 1] : '';
    let hasNextChord = this.state.currentChord < sequenceLength - 1;
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
        <Button
          onPress={() => this.setCountDown(true)}
          title='Start Practice'
        />
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
        <Animated.View
          style={{
            ...shrinkBarStyle,
            width: this.state.shrinkBarWidth,
          }}
        >
        </Animated.View>
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
  }
});