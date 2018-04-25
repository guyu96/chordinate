import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator} from 'react-navigation';

import ChordSelectionView from './src/components/ChordSelectionView/ChordSelectionView';
import ChordPracticeView from './src/components/ChordPracticeView/ChordPracticeView';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chordPracticeSequence: ["A maj", "C m", "F 7"]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ChordSelectionView /> */}
        <ChordPracticeView
          chordPracticeSequence={this.state.chordPracticeSequence}
          elapseTime={1000}
        />
      </View>
    );
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
