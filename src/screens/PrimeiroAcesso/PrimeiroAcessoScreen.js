import {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Label from '../../components/Label';

const PrimeiroAcessoScreen = ({route, navigation}) => {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [resumo, setResumo] = useState(null);

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Label value='Informe seus dados para cadastro:' style={styles.title}/>

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
              placeholder='Nos conte sobre você (profissão, experiência, etc)'
              value={resumo} onChangeText={(val) => setResumo(val)}/>

          <Button label={'Pronto!'} onPress={() => navigation.navigate('inscricoes')}/>

          <Label value='Fique tranquilo(a)! Não compartilharemos seus dados com terceiros.'
              style={styles.legend}/>
        </View>
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
    alignItems:'center'
  },
  logo:{
    width:150,
    height:150,
    marginTop:50,
    marginBottom:20
  },
  title:{},
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
    marginBottom:20,
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#F8E3D6',
    borderWidth:2,
    fontFamily:'Montserrat-Regular'
  },
  legend:{
    fontSize:12
  },
});

export default PrimeiroAcessoScreen;