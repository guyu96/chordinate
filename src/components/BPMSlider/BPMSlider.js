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
		margin: 15,
		flexDirection: 'row',
		alignItems: "center",
		justifyContent: "center"
	},
	slider: {
		width: '70%',
	},
	bpmText: {
		width: '30%',
	}
});

export default BPMSlider;