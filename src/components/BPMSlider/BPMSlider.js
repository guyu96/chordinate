import React, { Component } from 'react';
import { View, Slider, Text, StyleSheet } from 'react-native';

const BPMSlider = (props) => {
	return(
		<View style={styles.container}>
			<Slider
				minimumValue={props.minBPM}
				maximumValue={props.maxBPM}
				value={props.bpm}
				step={1}
				onValueChange={(currentBPM) => props.BPMHandler(currentBPM)}
			/>
			<Text>BPM: {props.bpm}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '60%',
		margin: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
});

export default BPMSlider;