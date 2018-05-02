import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import Orientation from 'react-native-orientation';
import { withNavigation } from "react-navigation";

class ProgressionListItem extends React.Component{

  _handleClick = () => {
    this.props.navigation.navigate('SelectionView', this.props.progressionData);
  }

  render() {
    const data = JSON.parse(this.props.progressionData);
    const title = data.sequenceName;
    const chords = data.chordSequenceIndices.reduce((accumulator, current) => {
      const chord = data.chordProgression[current];
      return accumulator + `, ${chord.root} ${chord.quality}`;
    }, '').substring(2);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={ this._handleClick }
      >
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            { title }
          </Text>
        </View>
        <View style={styles.chordsContainer}>
          <Text
            style={styles.chords}
            numberOfLines={1}
          >
            { chords }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1
  },
  titleContainer: {
  },
  title: {
    fontSize: 21
  },
  chordsContainer: {
    marginTop: 4
  },
  chords: {
    fontSize: 12
  }
});

export default withNavigation(ProgressionListItem);
