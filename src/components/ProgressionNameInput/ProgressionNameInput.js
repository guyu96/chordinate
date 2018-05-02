import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, AsyncStorage} from 'react-native';

export default class ProgressionNameInput extends Component {
  state = {
    name: this.props.name
  };

  handleInput = (input) => {
    this.setState({
      name: input
    });
    this.props.changeName(input);
  };

  render() {
    return (
      <TextInput
        style={styles.progressionNameInput}
        placeholder='Chord Progression Name'
        onChangeText={this.handleInput}
        value={this.state.name}
      />
    );
  }
}

const styles = StyleSheet.create({
  progressionNameInput: {
    height: '100%',
    width: '100%',
    textAlign: 'center'
  }
});
