import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const PinCode = () => {

  return (
    
    <View>
      <TextInput style={styles.input}

        placeholder='Service Area Pincode'
        placeholderTextColor={'grey'}
        keyboardType="numeric"
        maxLength={9}
      />


    </View>
  );


}
export default PinCode;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#00796A',
    borderRadius: 4,
    padding: 11,
    paddingLeft:14,
    fontFamily: 'poppins-semibold',
    fontSize: 16,
    color:'#000',
    
  }
})
