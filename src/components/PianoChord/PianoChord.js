import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { getChordNotes } from '../../chord'

const styles = {
  height: 1100,
  width: 2200,
  // whiteKeyHeight: 100,
  // whiteKeyWidth: 36,
  // blackKeyHeight: 50,
  // blackKeyWidth: 22,
  borderSize: 3,
  indicatorRadius: 5,
  whiteKeyColor: '#FFF',
  blackKeyColor: '#000',
  borderColor: '#222',
  indicatorColor: '#0295FC'
};
styles.borderSize = Math.floor(styles.height * 0.005);
styles.indicatorRadius = Math.floor(styles.height * 0.05);
styles.whiteKeyHeight = styles.height;
styles.whiteKeyWidth = Math.floor((styles.width - 8 * styles.borderSize) / 7);
styles.blackKeyHeight = Math.floor(styles.whiteKeyHeight * 0.6);
styles.blackKeyWidth = Math.floor(styles.whiteKeyWidth * 0.6);

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

  renderWhiteKey(x, y, key) {
    const attr = {
      x : x.toString(),
      y : y.toString(),
      width: styles.whiteKeyWidth.toString(),
      height: styles.whiteKeyHeight.toString(),
      stroke: styles.borderColor,
      strokeWidth: styles.borderSize.toString(),
      fill: styles.whiteKeyColor,
      key: key
    };
    return (
      <Rect {...attr}/>
    );
  }

  renderBlackKey(x, y, key) {
    const attr = {
      x : x.toString(),
      y : y.toString(),
      width: styles.blackKeyWidth.toString(),
      height: styles.blackKeyHeight.toString(),
      stroke: styles.borderColor,
      strokeWidth: styles.borderSize.toString(),
      fill: styles.blackKeyColor,
      key: key
    };
    return (
      <Rect {...attr}/>
    );
  }

  renderIndicator(x, y, key) {
    const attr = {
      cx: x.toString(),
      cy: y.toString(),
      r: styles.indicatorRadius.toString(),
      fill: styles.indicatorColor,
      key: key
    };
    return (
      <Circle {...attr}/>
    );
  }

  render() {
    const chordNotes = getChordNotes(this.props.rootName, this.props.qualityName);
    const whiteKeys = whiteKeyNotes.map((note, index) => {
      const { x, y } = this.noteToXY(note);
      return this.renderWhiteKey(x, y, `white-key-${index}`);
    });
    const blackKeys = blackKeyNotes.map((note, index) => {
      const { x, y } = this.noteToXY(note);
      return this.renderBlackKey(x, y, `black-key-${index}`);
    });
    const indicators = chordNotes.map((note, index) => {
      const { x, y } = this.indicatorToXY(note);
      return this.renderIndicator(x, y, `indicator-${index}`);
    });
    const attr = {
      viewBox: `0 0 ${styles.width} ${styles.height}`,
      height: '100%',
      width: '100%'
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
