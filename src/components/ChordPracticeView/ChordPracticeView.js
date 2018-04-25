import React, { Component } from 'react';
import Orientation from 'react-native-orientation';

import { StyleSheet, View, Text, Button, Animated } from 'react-native';

const initShrinkBarWidth = 500;

export default class ChordPracticeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChord: 1,
      shrinkBarStyles: { backgroundColor: 'gray', borderRadius: 1, height: 8 },
      shrinkBarWidth: new Animated.Value(initShrinkBarWidth),
    }
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  startPracticeHandler = () => {
    Animated.timing(
      this.state.shrinkBarWidth,
      {
        toValue: 0,
        duration: this.props.elapseTime,
      }
    ).start();
  };

  render() {
    const prevChord = this.state.currentChord > 0 ?
      <View style={styles.previewChord}>
        <Text style={{color: 'white', fontSize: 50}}>
          {this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord - 1]}
        </Text>
      </View>
      : null;

    const nextChord = this.state.currentChord < this.props.navigation.state.params.chordPracticeSequence.length - 1 ?
      <View style={styles.previewChord}>
        <Text style={{color: 'white', fontSize: 50}}>
          {this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord + 1]}
        </Text>
      </View>
      : null;

    return (
      <View style={styles.outerContainer}>
        <Button
          onPress={this.startPracticeHandler}
          title='Start Practice'
        />
        <View style={styles.slideShowView}>
          {prevChord}
          <View style={styles.currentChord}>
            <Text style={{color: 'white', fontSize: 90}}>
              {this.props.navigation.state.params.chordPracticeSequence[this.state.currentChord]}
            </Text>
          </View>
          {nextChord}
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

  previewChord: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
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
});