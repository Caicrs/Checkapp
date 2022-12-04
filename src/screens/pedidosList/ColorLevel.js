import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient';

const data = [
  {
    id: '1',
    extra: [
      { id: 'extra-1', done: false },
      { id: 'extra-2', done: false },
      { id: 'extra-3', done: false },
    ],
  },
  {
    id: '2',
    extra: [
      { id: 'extra-4', done: false },
      { id: 'extra-5', done: false },
      { id: 'extra-6', done: false },
    ],
  },
  {
    id: '2',
    extra: [
      { id: 'extra-4', done: false },
      { id: 'extra-5', done: false },
      { id: 'extra-6', done: false },
    ],
  },
];

const App = () => {
  const [count, setCount] = useState(0);
  const newArr = data;
  var percentage;

  const Add = () => {
    if (count < data.length) {
      setCount((count) => count + 1);
    } else {
      alert(data.length);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => Add()}>
        <View style={styles.item}>
          <Text style={styles.title}>Add</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.itemActive}>
        <Text style={styles.title}>{(count / data.length) * 100 }%</Text>
      </View>

      <LinearGradient
        colors={count / data.length == 0 ? ['transparent'] : ['green', 'white']}
        style={styles.containerLinear}
        start={{ x: 0.0, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[count / data.length, 0.1, 0]}>
        <Text style={styles.title}>
          {count} / {data.length}
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  containerLinear: {
    padding: 20,
    marginVertical: 8,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
  },
  itemActive: {
    backgroundColor: 'transparent',
    padding: 20,
    marginVertical: 8,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
  },
  itemAbsolut: {
    position: 'absolute',
    width: '100%',
    height: 5,
    backgroundColor: 'green',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;
