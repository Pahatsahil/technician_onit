

import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import ToggleSwitch from "toggle-switch-react-native";

export default class App extends Component {
  state = {
    isOnDefaultToggleSwitch: true,
    isOnLargeToggleSwitch: false,
    isOnBlueToggleSwitch: false
  };

  onToggle(isOn) {
    console.log("Changed to " + isOn);
  }

  render() {
    return (
      <View style={styles.container}>
        <ToggleSwitch
        onColor="#20C944"
        offColor="#F1F1F1"  
          isOn={this.state.isOnDefaultToggleSwitch}
          onToggle={isOnDefaultToggleSwitch => {
            this.setState({ isOnDefaultToggleSwitch });
            this.onToggle(isOnDefaultToggleSwitch);
          }}
          size='medium'
          thumbOnStyle={{backgroundColor:'#fff'}}
          thumbOffStyle={{backgroundColor:'#3E4A43'}}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});