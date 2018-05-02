import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ChordSelectionView from './src/components/ChordSelectionView/ChordSelectionView';
import ChordPracticeView from './src/components/ChordPracticeView/ChordPracticeView';
import ProgressionListView from 'chordinate/src/components/ProgressionListView/ProgressionListView'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chordProgressionsList: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressionListView/>
        {/*<ChordSelectionView/>*/}
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home : { screen: HomeScreen },
    Practice : { screen: ChordPracticeView }
  } , {
    initialRouteName : 'Home',
    headerMode: 'none'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 8,
    margin: 5
  },
  buttonText: {
    fontSize: 17
  },
});

export default class App extends React.Component{
  render(){
    return <RootStack/>
  }
}
