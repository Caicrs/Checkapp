import styled from 'styled-components';
import {TextInput, StyleSheet, View} from 'react-native';
import {colors} from '../../assets/styles/colors';
import React, {useState, useRef} from 'react';

const InputFirst = (placeholder: any) => {
  const [inputData, setInputData] = useState<string>('');
  const data = useRef('');

  return (
    <View style={styles.box}>
      <TextInput
        value={inputData}
        onChangeText={thisData => (setInputData(thisData))}
        style={styles.input}
        placeholder={placeholder.placeholder}
        placeholderTextColor="#2D2D2D"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '85%',
  },
  input: {
    color: '#2D2D2D',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 8,
    height: 50,
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: 'Sora-Regular',
    backgroundColor: colors.primaryTextColor,
  },
});

export default InputFirst;
