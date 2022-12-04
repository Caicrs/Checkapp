import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/styles/colors';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {pedidosData} from './dataPedidos';
import PedidosList from './pedidosList/pedidosList';

const EntregasDetalhes = ({route, navigation}) => {
  const {itemData} = route.params;
  const [input, setInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.name}>{itemData.name}</Text>
        <Text style={styles.entrega}>{itemData.entrega}</Text>
      </View>
      <View style={styles.thirdContainer}>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>Codigo de barras</Text>
        </View>
        <View style={styles.searchInput}>
          <TextInput
            value={input}
            onChangeText={text => setInput(text)}
            style={styles.input}
            placeholder={'Insira o código de barras'}
            placeholderTextColor={colors.white50}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => alert('search')}
            style={styles.appButtonContainer}>
            <Text
              style={{
                color: colors.primaryColor,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.thirdContainer}>
        <View style={styles.topicContainer}>
          <Text style={styles.topic}>Pedidos</Text>
          <Text style={styles.subTopic}>Selecione clicando no pedido</Text>
        </View>
        
     <PedidosList data={pedidosData}/>
      </View>
    </View>
  );
};

export default EntregasDetalhes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  secondContainer: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '700',
  },
  entrega: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
    opacity: 0.5,
  },
  thirdContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 30,
  },
  code: {
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    color: colors.white,
    fontWeight: '400',
  },
  topic: {
    flex: 9,
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    color: colors.white,
    fontWeight: '400',
  },
  subTopic: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 12,
    opacity: 0.5,
  },
  codeContainer: {
    paddingBottom: 15,
  },
  topicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },

  inputView: {},
  input: {
    flex: 9,
    color: colors.white,
    borderRadius: 8,
    height: 50,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: colors.white,
    borderWidth: 1,
    fontFamily: 'Sora-Regular',
    backgroundColor: 'transparent',
  },
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
