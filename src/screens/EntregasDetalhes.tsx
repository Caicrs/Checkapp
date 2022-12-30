import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../assets/styles/colors';
import { TextInput } from 'react-native-gesture-handler';
import PedidosList from './pedidosList/pedidosList';
import { AllToast } from '../components/toast';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';

interface CheckPedido {
  itens: any[];
  data: string;
  longitude: number;
  latitude: number;
}

const EntregasDetalhes = ({ route, navigation }) => {
  const { itemData } = route.params;
  const [input, setInput] = useState('');
  const time = useRef('');
  const selectedItems = useRef<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const { myLocation, PostPedido, playSound, longitude, latitude, backPage } = useAuth();
  const [isLoading, setLoading] = useState(true);

  const newFinish = useRef<CheckPedido>({
    itens: [],
    data: '',
    longitude: longitude,
    latitude: latitude,
  });

  const refInput = React.useRef<TextInput>(null);

  useEffect(() => {
    if (allItems.length < 1) {
      for (let i = 0; i < itemData.pedidos.length; i++) {
        itemData.pedidos[i].itens.map(res => {
          if (res.conferido === null) {
            allItems.push(res);
            setLoading(false);
          }
        });
      }
    }
    myLocation();
    refInput.current?.focus();
  }, []);

  function finishAll() {
    getLocal();
    PostPedido(newFinish.current).then(() => {
      navigation.navigate('Homepage');
    });
  }

  function getLocal() {
    var dateHour = moment().utcOffset('-03:00').format('YYYY-MM-DDThh:mm:ss');
    time.current = dateHour;
    newFinish.current.data = dateHour;
  }

  function checkPedido() {

    getLocal();

    if (input == '') {
      refInput.current?.focus();
      return;
    }

    let filteredData = newFinish.current.itens.filter(res => res.etiqueta === input);
    if (filteredData.length > 0) {
      playSound(3);
      AllToast.ToastError('Item ja foi conferido.');
      setInput('');
      refInput.current?.focus();
      return;
    }

    filteredData = allItems.filter(res => res.etiqueta === input);
    if (filteredData.length === 0) {
      playSound(4);
      AllToast.ToastError('Item não encontrado na lista.');
      setInput('');
      refInput.current?.focus();
      return;
    }

    const data = allItems.filter(res => res.etiqueta === input);
    const checkItem = {
      itemId: data[0].id,
      data: time.current,
      longitude: longitude,
      latitude: latitude,
      etiqueta: input
    };
    selectedItems.current.push(
      allItems.filter(res => res.etiqueta === input),
    );
    newFinish.current.itens.push(checkItem);
    setAllItems(allItems.filter(res => res.etiqueta !== input));

    if (allItems.length === 1) {
      finishAll();
      return;
    }

    playSound(1);
    setInput('');
    refInput.current?.focus();

  }

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.name}>{itemData.nome}</Text>
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
            returnKeyType="done"
            ref={refInput}
            onSubmitEditing={() => checkPedido()}
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
          <Text style={styles.topic}>Itens do pedido</Text>
        </View>
        {isLoading ? (
          <View style={[styles.loadingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#2D2D2D" />
          </View>
        ) : (
          <PedidosList data={allItems} />
        )}
      </View>
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          onPress={() => finishAll()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
