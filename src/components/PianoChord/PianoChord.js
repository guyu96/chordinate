import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const styles = {
  height: 100,
  width: 245,
  whiteKeyHeight: 100,
  whiteKeyWidth: 36,
  blackKeyHeight: 50,
  blackKeyWidth: 22,
  borderSize: 1,
  indicatorRadius: 5,
  whiteKeyColor: '#FFF',
  blackKeyColor: '#000',
  borderColor: '#222',
  indicatorColor: '#345E6C'
};

const whiteKeyNotes = [0, 2, 4, 5, 7, 9, 11];
const blackKeyNotes = [1, 3, 6, 8, 10];
const isWhiteKeyNote = (note) => whiteKeyNotes.includes(note);

export default class PianoChord extends Component {
  noteToXY(note) {
    let i = whiteKeyNotes.indexOf(note);
    if (i !== -1) {
      return {
        x : i * styles.whiteKeyWidth,
        y : 0
      };
    }
    i = blackKeyNotes.indexOf(note);
    i = i > 1 ? i + 2 : i + 1;
    return {
      x : i * styles.whiteKeyWidth - styles.blackKeyWidth / 2,
      y : 0
    };
  }

  indicatorToXY(note) {
    let i = whiteKeyNotes.indexOf(note);
    if (i !== -1) {
      return {
        x : i * styles.whiteKeyWidth + styles.whiteKeyWidth / 2,
        y : styles.blackKeyHeight + (styles.whiteKeyHeight - styles.blackKeyHeight) / 2
      };
    }
    i = blackKeyNotes.indexOf(note);
    i = i > 1 ? i + 2 : i + 1;
    return {
      x : i * styles.whiteKeyWidth,
      y : styles.blackKeyHeight / 2
    };
  }

  renderWhiteKey(x, y) {
    const attr = {
      x : x.toString(),
      y : y.toString(),
      width: styles.whiteKeyWidth.toString(),
      height: styles.whiteKeyHeight.toString(),
      stroke: styles.borderColor,
      strokeWidth: styles.borderSize.toString(),
      fill: styles.whiteKeyColor
    };
    return (
      <Rect {...attr}/>
    );
  }

  renderBlackKey(x, y) {
    const attr = {
      x : x.toString(),
      y : y.toString(),
      width: styles.blackKeyWidth.toString(),
      height: styles.blackKeyHeight.toString(),
      stroke: styles.borderColor,
      strokeWidth: styles.borderSize.toString(),
      fill: styles.blackKeyColor
    };
    return (
      <Rect {...attr}/>
    );
  }

  renderIndicator(x, y) {
    const attr = {
      cx: x.toString(),
      cy: y.toString(),
      r: styles.indicatorRadius.toString(),
      stroke: styles.borderColor,
      strokeWidth: styles.borderSize.toString(),
      fill: styles.indicatorColor
    };
    return (
      <Circle {...attr}/>
    );
  }

  render() {
    const whiteKeys = whiteKeyNotes.map((note, index) => {
      const { x, y } = this.noteToXY(note);
      return this.renderWhiteKey(x, y);
    });
    const blackKeys = blackKeyNotes.map((note, index) => {
      const { x, y } = this.noteToXY(note);
      return this.renderBlackKey(x, y);
    });
    const indicators = this.props.chordNotes.map((note, index) => {
      const { x, y } = this.indicatorToXY(note);
      return this.renderIndicator(x, y);
    });
    const attr = {
      height: styles.height.toString(),
      width: styles.width.toString()
    };
    return (
      <Svg {...attr}>
        { whiteKeys }
        { blackKeys }
        { indicators }
      </Svg>
    );
  }
}
