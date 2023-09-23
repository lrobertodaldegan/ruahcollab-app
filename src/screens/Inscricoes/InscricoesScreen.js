import {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import DemandaCard from '../../components/DemandaCard';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import { get } from '../../service/Rest/RestService';

const InscricoesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [inscricoes, setInscricoes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    get('/subscription', () => navigation.navigate('error')).then(response => {
      if(response.status === 200)
        setInscricoes(response.data);

      setLoading(false);
    });
  }, [isFocused]);

  const renderSubs = () => {
    if(loading){
      return <Loader color='#8A4A20'/>
    } else {
      return (
        <FlatList style={styles.content}
            ListHeaderComponent={<Label style={styles.title}
                                    value='Minhas inscrições:'/>}
            keyExtractor={(item) => item.id}
            data={inscricoes}
            renderItem={({item}) => {
              if(item)
                return <DemandaCard item={item}/>
              else
                return <></>
            }}
        />
      )
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        {renderSubs()}

        <Footer navigation={navigation} selected='inscricoes'/>
      </View>
    </>
  );
}

const size = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:size.height,
    width:size.width,
    backgroundColor:'#fafafa',
    padding:20,
  },
  content:{
    marginBottom:120
  },
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
});

export default InscricoesScreen;