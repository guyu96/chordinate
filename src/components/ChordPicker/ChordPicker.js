import React, { Component } from 'react';

import { View, Picker, StyleSheet } from 'react-native';

class ChordPicker extends Component {
  state = {
    selectedItem: this.props.selectionList[this.props.selectedIndex]
  };

  itemSelectionHandler = (index) => {
    this.setState({
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
