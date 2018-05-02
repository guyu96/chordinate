import React, { Component } from 'react';
import {
  Easing,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

export default class ProgressionBar extends Component {
  _renderRow = ({data, active}) => <ChordTile data={data} active={active} />

  chordOrderChangeHandler = (newSeq) => {
    this.props.mostRecentChordSequence(newSeq);
  };

  render() {
    return (
      <View style={styles.container}>
        <SortableList
          horizontal
          style={styles.list}
          data={this.props.progression}
          renderRow={this._renderRow}
          onPressRow={ (key) => { this.props.selectHandler(parseInt(key)); } }
          onChangeOrder={ (nextOrder) => {this.chordOrderChangeHandler(nextOrder)} }
        />
      </View>
    );
  }
}

class ChordTile extends Component {
  render() {
    const { data, active, selectHandler } = this.props;
    const tileStyle = data.active ? styles.chordTileSelected : styles.chordTile;
    return (
      <Animated.View style={[
        tileStyle,
      ]}>
        <Text style={styles.chordRoot}>{ data.root }</Text>
        <Text style={styles.chordQuality}>{ data.quality }</Text>
      </Animated.View>
    );
  }
}

const window = Dimensions.get('window');

const chordTileStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  padding: 10,
  width: 100,
  height: '100%',
  backgroundColor: '#e6e6e6',
};
const chordTileSelectedStyle = {
  ...chordTileStyle,
  backgroundColor: '#b2b2b2'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  list: {
    height: '100%',
    backgroundColor: '#e6e6e6',
    width: window.width
  },

  chordTile: chordTileStyle,
  chordTileSelected: chordTileSelectedStyle,

  chordRoot: {
    fontSize: 26,
    color: '#262626'
  },
  chordQuality: {
    fontSize: 15,
    color: '#262626'
  }
});
