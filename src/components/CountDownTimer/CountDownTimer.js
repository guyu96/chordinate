import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const defaultCountDownStep = 1000;  // 1 sec
const countTimes = 3;

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDownVal: countTimes,
      modalVisible: true
    };
  }

  countDown = () => {
    this.timer = setInterval(() => {
      if (this.state.countDownVal == 1) {
        clearInterval(this.timer);
        this.setState({
          modalVisible: false
        });
        this.props.setCountDown(false);
        return;
      }

      this.setState((prevState) => {
        return {
          countDownVal: prevState.countDownVal - 1,
        }
      });
    }, defaultCountDownStep);
  };

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reStart !== this.props.reStart) {
      this.setState({
        countDownVal: countTimes,
        modalVisible: true
      });
      this.countDown();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.modalVisible}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle={'overFullScreen'}
      >
      <View style={styles.modalView}>
        <Text style={styles.countDownText}>
          {this.state.countDownVal}
        </Text>
      </View>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  countDownText: {
    color: 'gray',
    fontSize: 60
  }
});

export default CountDownTimer;