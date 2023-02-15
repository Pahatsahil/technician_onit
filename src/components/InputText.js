import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputText = () => {

  return (
    <View>
      <TextInput style={styles.input}
        placeholder='Enter your Shop Name'
        placeholderTextColor={'grey'}
      />


    </View>
  );


}
export default InputText;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#00796A',
    color:'#000',
    borderRadius: 4,
    padding: 11,
    paddingLeft:14,
    fontFamily: 'poppins-semibold',
    fontSize: 16,
    marginBottom:10
    
  }
})
