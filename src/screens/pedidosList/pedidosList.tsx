import {FlatList} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../assets/styles/colors';

const PedidosList = (result: any, check: any) => {
  const [pedidosData, setPedidosData] = useState(result.data);
  console.log("-----------")
  console.log(check)

  return (
    <FlatList
      style={styles.flatlist}
      data={pedidosData}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <View key={item.id} style={styles.pedidosActive}>
            <Text style={styles.textId}>
             {item.loja}
            </Text>
            <Text style={styles.textId}>
             Pedido : {item.pedido}
            </Text>
            <Text style={styles.textId}>
              Quantidade :  0 / {item.itens.length} 
            </Text>
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
    borderColor: colors.white50,

    borderWidth: 1,
  },
  pedidos: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 15,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.black
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
  textId: {
    color: colors.white,
    fontWeight: '700',
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
