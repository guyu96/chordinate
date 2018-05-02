import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import Orientation from 'react-native-orientation';
import { withNavigation } from "react-navigation";
import ProgressionListItem from 'chordinate/src/components/ProgressionListItem/ProgressionListItem';

class ProgressionListView extends Component{
  state = {
    progressionList : [],
    loaded : false
  };

  loadProgressions = async () => {
    try {
      const progressions = [];
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        let value = await AsyncStorage.getItem(key);
        progressions.push(value);
      }
      this.setState({
        progressionList : progressions,
        loaded : true
      });
    } catch (error) {
      alert('Error Loading Progression Data');
    }
  };

  componentDidMount() {
    Orientation.lockToPortrait();
    this.loadProgressions();
  }

  onPressNewProgression = () => {
  }

  _renderItem = ({item}) => {
    return (
      <ProgressionListItem progressionData={item} />
    );
  }

  render(){
    if (!this.state.loaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container} >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Saved Chord Progressions
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={ this.state.progressionList }
            renderItem={ this._renderItem }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='New Progression'
            onPress={() => { this.props.navigation.navigate('SelectionView'); }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  },

  listContainer: {
    width: '100%',
    flex: 1,
    borderTopWidth: 1,
  },
  list: {
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});

export default withNavigation(ProgressionListView);
