import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/styles/colors';

const PedidosList = (result: any) => {

  return (
    <FlatList
      style={styles.flatlist}
      data={result.data}
      keyExtractor={i => i.id}
      renderItem={({item}) => {
        return (
          <View key={item.id} style={styles.pedidosActive}>
            <Text style={styles.textId}>{item.item}</Text>
          </View>
        );
      }}
    />
  );
};

export default PedidosList;

const styles = StyleSheet.create({
  flatlist: {
    display: 'flex',
  },
  pedidos: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  pedidosActive: {
    backgroundColor: colors.black,
    color: colors.white,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  pedidosChecked: {
    backgroundColor: colors.green,
    color: colors.black,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  textId: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  textChecked: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    opacity: 0.25,
  },
  SubTextChecked: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
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
