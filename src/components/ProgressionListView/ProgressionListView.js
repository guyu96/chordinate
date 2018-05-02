import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import Orientation from 'react-native-orientation';
import {withNavigation} from "react-navigation";
import ProgressionListItem from 'chordinate/src/components/ProgressionListItem/ProgressionListItem';



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
        if(value){
          this.setState({progressionNamesList: value, loaded:true});
        } else{
          this.setState({progressionNamesList: ["Error", "Loading", "List"], loaded:true});
        }
      }
       catch(error){
        this.setState({progressionNamesList:["Error"], loaded:true});
      }
  };

  _renderItem = (item) =>{

  };


  render(){
    if(!this.state.loaded){
      return(
        <View><Text>Loading...</Text></View>
      )

    }
    return(
      <View style={{flex:1}}>
      <FlatList
        data={this.state.progressionNamesList}
        renderItem={({item}) => <ProgressionListItem text={item} index={this.state.progressionNamesList.indexOf(item)}/>}
         /*={(item, index) => {<Text>{item}</Text>}}*/
      />
      {/*<Text>OMG</Text>*/}
      <Text>{this.state.progressionNamesList}</Text>
      </View>
    )
  }
}

export default withNavigation(ProgressionListView);