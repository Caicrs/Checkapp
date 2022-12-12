import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/styles/colors';
import {TextInput} from 'react-native-gesture-handler';
import PedidosList from './pedidosList/pedidosList';
import {AllToast} from '../components/toast';
import moment from 'moment';

interface CheckPedido {
  itens: any[];
  data: string;
  longitude: string;
  latitude: string;
}

const EntregasDetalhes = ({route}) => {
  const {itemData} = route.params;
  const [input, setInput] = useState('');
  const long = useRef('');
  const lati = useRef('');
  const time = useRef('');
  const newData = useRef<CheckPedido>({
    itens: [],
    data: '',
    longitude: long.current,
    latitude: lati.current,
  });

  var pedidos: any[] = [];

  // scanItens for put the itens inside the pedidos array variable
  function scanItens() {
    for (let i = 0; i < itemData.pedidos.length; i++) {
      itemData.pedidos[i].itens.map(data => {
        pedidos.push(data);
      });
    }
  }

  scanItens();

  function getLocal() {
    moment.locale('pt-br');
    var dateHour = moment().format('DD/MM/YYYY, hh:mm:ss');
    time.current = dateHour;
    newData.current.data = dateHour;
  }

  function checkPedido() {
    console.log(newData.current);
    var counter = 0;
    // Validation for empty input
    if (input == '') {
      AllToast.ToastError('Barra de busca vazia...digite algo');
    }
    // Input with value
    else {
      // Loop for search pedidos
      for (let i = 0; i < pedidos.length; i++) {
        // Validation for equal results
        if (pedidos[i].etiqueta == input) {
          // Call the time and geolocalization function
          getLocal();
          var checkItem = {
            itemId: pedidos[i].id,
            time: time.current,
            longitude: long.current,
            latitude: lati.current,
          };

          var secondCounter = 0;

          if (newData.current.itens.length === 0) {
            newData.current.itens.push(checkItem);
          } else {
            newData.current.itens.map(item => {
              if (item.itemId === pedidos[i].id) {
                AllToast.ToastError('Esse item já foi adicionado !');
              } else {
                secondCounter++;
                if (secondCounter === newData.current.itens.length) {
                  AllToast.ToastError('Item adicionado !');
                  // Adicionar som ao concluir
                  newData.current.itens.push(checkItem);
                }
              }
            });
          }
        } else {
          counter++;
          if (counter === pedidos.length) {
            AllToast.ToastError('Código de barras não encontrado !');
          }
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.name}>{itemData.nome}</Text>
        <Text style={styles.entrega}>
          {itemData.dataPrevisao.substr(0, 10)}
        </Text>
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
            onPress={() => checkPedido()}
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
      <View style={styles.fourContainer}>
        <View style={styles.topicContainer}>
          <Text style={styles.topic}>Pedidos</Text>
          <Text style={styles.subTopic}>Selecione clicando no pedido</Text>
        </View>
        <PedidosList data={itemData.pedidos} checkData={newData} />
      </View>
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          onPress={() => alert('search')}
          style={styles.appButtonConfirm}>
          <Text
            style={{
              color: colors.primaryColor,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Confirmar entrega
          </Text>
        </TouchableOpacity>
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
  confirmContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '10%',
  },
  appButtonConfirm: {
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
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
  fourContainer: {
    width: '85%',
    flex: 1,
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
