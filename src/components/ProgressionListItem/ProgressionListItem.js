import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import Orientation from 'react-native-orientation';
import {withNavigation} from "react-navigation";

class ProgressionListItem extends React.Component{
  render(){
    return(
      <View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  ProgressionItem:{
    flex: 1,
    backgroundColor: this.props.index % 2 == 0? '#0b0b0b' : '#6e6d6d'
  }
});