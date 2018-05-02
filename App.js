import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ChordSelectionView from './src/components/ChordSelectionView/ChordSelectionView';
import ChordPracticeView from './src/components/ChordPracticeView/ChordPracticeView';
import ProgressionListView from 'chordinate/src/components/ProgressionListView/ProgressionListView'

class HomeScreen extends Component {
  render() {
    return <ProgressionListView />;
  }
}

const RootStack = StackNavigator(
  {
    Home : { screen: HomeScreen },
    Practice : { screen: ChordPracticeView },
    SelectionView : { screen: ChordSelectionView }
  } , {
    initialRouteName : 'Home',
    headerMode: 'none'
  }
);

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
