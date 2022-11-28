import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import Login from './screens/Login';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Login/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
