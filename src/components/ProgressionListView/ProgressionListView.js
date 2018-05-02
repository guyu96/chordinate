import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import Orientation from 'react-native-orientation';
import {withNavigation} from "react-navigation";


class ProgressionListView extends Component{
  constructor(props){
    super(props);
    this.state = {
      progressionNamesList: [],
      loaded:false
    }
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this._loadInitialState().done();
  }

  _loadInitialState = async () =>{
      try {
        let value = await AsyncStorage.getAllKeys();
        this.setState({progressionNamesList: value, loaded:true});

      }
       catch(error){
        this.setState({progressionNamesList:["Error"], loaded:true});
      }
  };


  render(){
    if(!this.state.loaded){
      return(
        <View><Text>Loading...</Text></View>
      )

    }
    return(
      <View>
      <FlatList
        data={this.state.progressionNamesList}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      {/*<Text>OMG</Text>*/}
      {/*<Text>{this.state.progressionNamesList}</Text>*/}
      </View>
    )
  }
}

export default withNavigation(ProgressionListView);