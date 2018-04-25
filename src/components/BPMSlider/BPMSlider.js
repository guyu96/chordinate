import React, { Component } from 'react';
import { View, Slider, StyleSheet } from 'react-native';


class BPMSlider extends Component {
    state = {
        bpm:this.props.bpm,
        minBPM:this.props.minBPM,
        maxBPM:this.props.maxBPM,
    };


    BPMChange = (currentBPM) => {
        this.setState({
           bpm: currentBPM
        }, this.props.BPMHandler(this.state.bpm));

    };


    render(){
        return(
            <View>
                <Slider
                    minimumValue={this.state.minBPM}
                    maximumValue={this.state.maxBPM}
                    value={this.state.bpm}
                    step={1}

                    onValueChange={
                        (value) =>this.BPMChange(value)
                    }
                />
            </View>
        );
    }
}

export default BPMSlider;
