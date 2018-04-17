import React, { Component } from 'react';
import {
  Easing,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import SortableList from 'react-native-sortable-list';

export default class ProgressionBar extends Component {
  _renderRow = ({data, active}) => <ChordTile data={data} active={active} />

  render() {
    return (
      <View style={styles.container}>
        <SortableList
          horizontal
          style={styles.list}
          data={this.props.progression}
          renderRow={this._renderRow}
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
    const { data, active } = this.props;
    return (
      <Animated.View style={[
        styles.chordTile,
        this._style
      ]}>
        <Text style={styles.chordText}>{ data.text }</Text>
      </Animated.View>
    );
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  list: {
    height: 80,
    width: window.width
  },

  chordTile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 80,
    height: 80,
    marginHorizontal: 2,
    borderRadius: 2
  },

  chordText: {
    fontSize: 24,
    color: '#222'
  }
});
