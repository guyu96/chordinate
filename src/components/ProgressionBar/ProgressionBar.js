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
  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);
    this._style = {
      ...Platform.select({

        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1]
            })
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10]
          })
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07]
            })
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6]
          })
        }

      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { data, active, selectHandler } = this.props;
    const tileStyle = data.active ? styles.chordTileSelected : styles.chordTile;
    return (
      <Animated.View style={[
        tileStyle,
        this._style
      ]}>
        <Text style={styles.chordText}>{ `${data.root} ${data.quality}` }</Text>
      </Animated.View>
    );
  }
}

const window = Dimensions.get('window');

const chordTileStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  width: 80,
  height: 80,
  borderColor: '#666',
  borderWidth: 1,
};
const chordTileSelectedStyle = {
  ...chordTileStyle,
  borderColor: '#161616',
  borderWidth: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  list: {
    height: 80,
    width: window.width
  },

  chordTile: chordTileStyle,
  chordTileSelected: chordTileSelectedStyle,

  chordText: {
    fontSize: 16,
    color: '#222'
  }
});
