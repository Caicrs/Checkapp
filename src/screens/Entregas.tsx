import React, {useState, useEffect} from 'react';
import SearchIcon from '../assets/search.svg';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/styles/colors';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {data} from './data';
import {useAuth} from '../context/AuthContext';
import LoadingComponent from '../components/loading';


const Entregas = ({navigation}) => {
  const [input, setInput] = useState('');
  const [dataSearched, setDataSearched] = useState<any>([]);
  const {GetAllPedidos, pedidos} = useAuth();

  useEffect(() => {
    GetAllPedidos();
  }, []);

  const search = () => {
    if (input != '') {
      console.log(input);
      const result: any[] = [];
      for (let i = 0; i < data.length; i++) {
        var nameFiltered = data[i].name.includes(input);
        if (data[i].entrega == input || nameFiltered) {
          result.push(data[i]);
          setDataSearched(result);
        }
        setInput('');
      }
      if (result.length == 0) {
        console.log('Não existe ou não foi encontrado');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.textUser}>Lista de Entregas</Text>
      </View>
      <View style={styles.searchInput}>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          style={styles.input}
          placeholder={'Busque por nome / entrega'}
          placeholderTextColor={colors.white50}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => search()}
          style={styles.appButtonContainer}>
          <SearchIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      {pedidos ? (
        <FlatList
          style={styles.thirdContainer}
          data={dataSearched.length == 0 ? pedidos : dataSearched}
          renderItem={({item}) =>
            item.pedidos.map(data2 => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EntregasDetalhes', {itemData: data2})
                }>
                <View
                  key={Math.floor(Math.random() * 10000)}
                  style={styles.card}>
                  <Text style={styles.entregaId}>
                    {data2.pedido} - {data2.loja}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        />
      ) : (
        <LoadingComponent />
      )}
    </View>
  );
};

export default Entregas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  secondContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  thirdContainer: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  textUser: {
    fontSize: 20,
    color: colors.white,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  entregaId: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '700',
  },
  cardName: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '400',
  },
  searchInput: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
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
});
