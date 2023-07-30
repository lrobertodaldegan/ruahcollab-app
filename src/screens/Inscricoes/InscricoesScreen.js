import {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import DemandaCard from '../../components/DemandaCard';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Label from '../../components/Label';
import logo from '../../assets/img/Logo.png';

const demandasIncrito = [
  {
    id:0,
    titulo:'Atendimento psicológico semanal',
    fotos:[logo, logo, logo],
    descricao:'Resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo',
    recorrencia:'Semanal',
    status:'aceito',
    instituicao:{
      nome:"Igreja Ação do Espírito",
      telefone:'+5541999999999',
      email:'email@email.com',
      endereco:"Rua XXX, Bairro X, Cidade/Estado",
      qtdDemandas:10
    }
  },
  {
    id:1,
    titulo:'Atendimento psicológico semanal',
    fotos:[logo, logo, logo],
    descricao:'Resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo resumo',
    recorrencia:'Semanal',
    status:'aceito',
    instituicao:{
      nome:"Igreja Ação do Espírito",
      telefone:'+5541999999999',
      email:'email@email.com',
      endereco:"Rua XXX, Bairro X, Cidade/Estado",
      qtdDemandas:10
    }
  }
];

const InscricoesScreen = ({navigation}) => {

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <FlatList style={styles.content}
            ListHeaderComponent={<Label style={styles.title}
                                    value='Minhas inscrições:'/>}
            keyExtractor={(item) => item.id}
            data={demandasIncrito}
            renderItem={({item}) => {
              return (
                <DemandaCard item={item}/>
              );
            }}
        />

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