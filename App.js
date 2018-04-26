import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator} from 'react-navigation';

import ChordSelectionView from './src/components/ChordSelectionView/ChordSelectionView';
import ChordPracticeView from './src/components/ChordPracticeView/ChordPracticeView';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chordPracticeSequence: ["A maj", "C m", "F 7"]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ChordSelectionView/>
      </View>
    );

  }
}

const RootStack = StackNavigator({
    Home: {
        screen: HomeScreen
    },
    Practice:{
        screen: ChordPracticeView
    },
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends React.Component{
    render(){
        return <RootStack/>
    }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

// export default StackNavigator({
//     Home: {
//         screen: HomeScreen,
//     },
// });
