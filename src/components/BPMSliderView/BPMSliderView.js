import React, { Component } from 'react';
import { View, Slider, Text, StyleSheet } from 'react-native';

import BPMSlider from '../BPMSlider/BPMSlider';

class BPMSliderView extends Component {
    state = {
        sliderbpm:80,
        minBPM:50,
        maxBPM:200,
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