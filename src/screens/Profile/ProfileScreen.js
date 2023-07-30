import {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Label from '../../components/Label';

const LoginScreen = ({route, navigation}) => {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [resumo, setResumo] = useState(null);

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <View style={styles.formWrap}>
          <Label value='Perfil' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Seu nome'
              value={nome} onChangeText={(val) => setNome(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Seu telefone'
              value={telefone} onChangeText={(val) => setTelefone(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Seu email'
              value={email} onChangeText={(val) => setEmail(val)}/>

          <TextInput style={styles.txtArea} placeholderTextColor='#8A4A20'
              placeholder='Resumo'
              value={resumo} onChangeText={(val) => setResumo(val)}/>

          <Button label={'Salvar'} onPress={() => navigation.navigate('inscricoes')}/>
        </View>

        <Footer navigation={navigation} />
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
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
  input:{
    borderRadius:10,
    marginVertical: 5,
    width:size.width - 40,
    height: 50 ,
    paddingHorizontal:10,
    borderColor:'#F8E3D6',
    borderWidth:2,
    fontFamily:'Montserrat-Regular'
  },
  txtArea:{
    borderRadius:10,
    marginVertical: 5,
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#F8E3D6',
    borderWidth:2,
    fontFamily:'Montserrat-Regular'
  },
});

export default LoginScreen;