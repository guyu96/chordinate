import React, { Component } from 'react';
import Orientation from 'react-native-orientation';

import { StyleSheet, View, Text, Button, Animated } from 'react-native';

const initShrinkBarWidth = 500;
var sequenceLength;

export default class ChordPracticeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChord: 0,
      shrinkBarStyles: {
        backgroundColor: 'gray',
        borderRadius: 1,
        height: 8
      },
      shrinkBarWidth: new Animated.Value(initShrinkBarWidth),
      practiceSpeed: this.props.navigation.state.params.elapseTime
    };
    sequenceLength = this.props.navigation.state.params.chordPracticeSequence.length;
    //console.log(this.state.practiceSpeed);
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  startPracticeHandler = () => {
    Animated.timing(
      this.state.shrinkBarWidth,
      {
        toValue: 0,
        duration: this.state.practiceSpeed,
      }
    ).start(() => {
      this.setState((prevState) => {
        return {
          currentChord: prevState.currentChord + 1,
          shrinkBarWidth: new Animated.Value(initShrinkBarWidth)
        }
      });
      if (this.state.currentChord < sequenceLength) {
        this.startPracticeHandler();
      } else {  // end of practice sequence
        this.setState({
          currentChord: 0,
          shrinkBarWidth: new Animated.Value(initShrinkBarWidth)
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
        <Button
          onPress={this.startPracticeHandler}
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
            ...this.state.shrinkBarStyles,
            width: this.state.shrinkBarWidth,
          }}
        >
        </Animated.View>
      </View>
    )
  }
};

const previewChordStyle = {
  width: 150,
  height: 150,
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
    width: 250,
    height: 250,
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