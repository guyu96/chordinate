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
				style={styles.slider}
			/>
			<Text style={styles.bpmText}>{props.bpm} BPM</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		margin: 10,
		flexDirection: 'row',
    alignItems: "stretch",
    justifyContent: "center"
	},
	slider: {
		width: '70%',
		marginRight: 5,
	},
	bpmText: {
		width: '30%',
		alignSelf: 'center'
	}
});

export default BPMSlider;