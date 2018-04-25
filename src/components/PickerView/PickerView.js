import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChordPicker from '../ChordPicker/ChordPicker';
import { noteNames, qualityNames } from '../../chord';

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
        />
        <ChordPicker
          selectedIndex={this.state.qualitySelected}
          selectionList={qualityNames}
          onItemSelected={this.qualitySelectHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    maxWidth: 250,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
