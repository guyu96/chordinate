import React, { Component } from 'react';

import { View, Picker, StyleSheet } from 'react-native';

class ChordPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
      selectedItem: this.props.selectionList[this.props.selectedIndex]
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedIndex == prevState.selectedIndex) {
      return null;
    }
    return {
      selectedIndex: nextProps.selectedIndex,
      selectedItem: nextProps.selectionList[nextProps.selectedIndex]
    };
  }

  itemSelectionHandler = (index) => {
    this.setState({
      selectedIndex: index,
      selectedItem: this.props.selectionList[index]
    });
    this.props.onItemSelected(index);
  };

  render() {
    return (
      <View>
        <Picker
          style={styles.pickerStyle}
          mode="dropdown"
          selectedValue={this.state.selectedItem}
          onValueChange={(itemValue, itemIndex) => this.itemSelectionHandler(itemIndex)}
          itemStyle={styles.pickerItemStyle}  // only works on iOS
        >
          {
            this.props.selectionList.map((item, index) => {
              return (
                <Picker.Item label={item} value={item} key={index} />
              )
            })
          }
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    width: 120,
  },
  pickerItemStyle: {
    fontSize: 25,
  }
});

export default ChordPicker;
