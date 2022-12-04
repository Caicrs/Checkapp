import {FlatList, TextInput} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../assets/styles/colors';

const PedidosList = (data: any) => {
  const [input, setInput] = useState('');
  const [pedidosData, setPedidosData] = useState(data.data);
  const newArr = data.data;

  const Action = item => {
    const newItem = pedidosData.map(val => {
      if (val.id === item.id) {
        return {...val, done: !val.done};
      } else {
        return val;
      }
    });
    setPedidosData(newItem);
  };

  return (
    <FlatList
      style={styles.flatlist}
      data={pedidosData}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => Action(item)}
            key={item.id}
            style={item.done ? styles.pedidosActive : styles.pedidos}>
            <Text style={item.done ? styles.textIdActive : styles.textId}>
              {item.id}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default PedidosList;

const styles = StyleSheet.create({
  flatlist: {
    display: 'flex',
    height: 150,
  },
  pedidos: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
  },
  pedidosActive: {
    backgroundColor: colors.white,
    color: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  textId: {
    color: colors.white,
  },
  textIdActive: {
    color: colors.black,
  },
  searchInput: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  appButtonContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    borderColor: colors.white,
    borderWidth: 1,
    fontFamily: 'Sora-Regular',
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
