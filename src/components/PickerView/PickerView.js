import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordPicker from 'chordinate/src/components/ChordPicker/ChordPicker';
import { noteNames, qualityNames } from 'chordinate/src/chord';

export default class PickerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootSelected: 0,
      qualitySelected: 0,
    };
  }

  componentDidMount() {
    this.chordChangeHelper();
  }

  /*
    receive props from ChordSelectionView to select active chord
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextRoot = nextProps.activeRoot;
    const nextQuality = nextProps.activeQuality;
    let nextRootIndex = 0;
    let nextQualityIndex = 0;
    for (let i = 0; i < noteNames.length; i++) {
      if (noteNames[i] == nextRoot) {
        nextRootIndex = i;
        break;
      }
    }
    for (let i = 0; i < qualityNames.length; i++) {
      if (qualityNames[i] == nextQuality) {
        nextQualityIndex = i;
        break;
      }
    }
    if (nextRootIndex == prevState.rootSelected && nextQualityIndex == prevState.qualitySelected) {
      return null;
    }
    return {
      rootSelected: nextRootIndex,
      qualitySelected: nextQualityIndex
    }
  }

  chordChangeHelper = () => {
    this.props.chordChangeHandler(
      noteNames[this.state.rootSelected],
      qualityNames[this.state.qualitySelected]
    );
  }

  chordSelectHandler = (index) => {
    this.setState(
      { rootSelected: index },
      this.chordChangeHelper
    );
  };

  qualitySelectHandler = (index) => {
    this.setState(
      { qualitySelected: index },
      this.chordChangeHelper
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ChordPicker
          selectedIndex={this.state.rootSelected}
          selectionList={noteNames}
          onItemSelected={this.chordSelectHandler}
          width={85}
        />
        <ChordPicker
          selectedIndex={this.state.qualitySelected}
          selectionList={qualityNames}
          onItemSelected={this.qualitySelectHandler}
          width={110}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
