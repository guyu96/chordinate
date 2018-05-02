import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import Orientation from 'react-native-orientation';
import {withNavigation} from "react-navigation";

class ProgressionListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      itemName: this.props.text,
      index: this.props.index
    }
  }

  _clickHandler = async() => {
    if(this.state.itemName == "Add New Sequence"){
      this.props.navigation.navigate('SelectionView');
    }
    else{
      try{
        let progressionData = await AsyncStorage.getItem(this.state.itemName);
        if(progressionData){
          this.props.navigation.navigate('SelectionView', progressionData);
        }
      } catch(error){
        this.props.navigation.navigate('Practice');
      }
    }
  }

  render(){
    return(
      <View style={{
        flex: 1,
        backgroundColor: this.state.index % 2 == 0? '#3f3f3f' : '#7d7d7d'
      }}>
        <Button
          style = {
            {color: this.state.index % 2 == 0? '#3f3f3f' : '#7d7d7d'}
          }
          onPress={this._clickHandler}
          title={this.state.itemName}
        />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   ProgressionItem:{
//     // width: '100%',
//     backgroundColor: parseInt(this.state.index) % 2 == 0? '#3f3f3f' : '#7d7d7d'
//     backgroundColor: '#3f3f3f'
//   }
// });

export default withNavigation(ProgressionListItem);