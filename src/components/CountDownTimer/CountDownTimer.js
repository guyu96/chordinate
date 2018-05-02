import React, { Component } from 'react';
import { Modal, View, Text } from 'react-native';

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
        animationType={"fade"}
        transparent={false}
        visible={this.state.modalVisible}
        supportedOrientations={['portrait', 'landscape']}
      >
      <View>
        <Text>
          {this.state.countDownVal}
        </Text>
      </View>
    </Modal>
    );
  }
}

export default CountDownTimer;