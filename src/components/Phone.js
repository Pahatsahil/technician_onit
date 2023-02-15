import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
    };
  }
  Pass = () => {
    var num = this.state.number;
    alert(num);
  };

  render() {
    return (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.container}>
            <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              offset={20}
              onPressFlag={this.onPressFlag}
              initialCountry={'in'}
              style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#00796A',
                paddingVertical: 10,
                padding: 10,
                width: '90%',
              }}
              pickerButtonColor={'#fff'}
              pickerBackgroundColor={'#00796A'}
              flagStyle={{width: 40, height: 30, borderWidth: 0}}
              onChangePhoneNumber={number => this.setState({number})}
              textProps={{
                placeholder: 'Mobile Number',
                placeholderTextColor: 'grey',
                maxLength: 20,
              }}
              autoFormat="true"
              textStyle={{
                fontSize: 16,
                height: 35,
                borderLeftWidth: 1,
                borderColor: '#000',
                color: '#000',
                fontFamily: 'poppins-semibold',
                marginLeft: 5,
                paddingLeft: 5,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    backgroundColor:'#fff'
  },
  info: {
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
  },
});

module.exports = Test;
