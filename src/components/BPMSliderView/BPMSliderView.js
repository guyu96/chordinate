import React, { Component } from 'react';
import { View, Slider, Text, StyleSheet } from 'react-native';

import BPMSlider from '../BPMSlider/BPMSlider';

class BPMSliderView extends Component {
    state = {
        sliderbpm:this.props.bpm,
        minBPM: this.props.minBPM,
        maxBPM:this.props.maxBPM,
    };

    BPMSelection = (SliderBPM) => {
        this.setState(
            {sliderbpm: SliderBPM}
        );
    };

    render(){
        return(
            <View>
                <Text style={{height: 40}}>{this.state.sliderbpm}</Text>
                <BPMSlider minBPM={this.state.minBPM} maxBPM={this.state.maxBPM} bpm={this.state.bpm} BPMHandler={this.BPMSelection}/>
            </View>
        );
    }
}

export default BPMSliderView;