import {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import ErrorLabel from '../../components/ErrorLabel';
import DeviceInfo from 'react-native-device-info';
import CacheService from '../../service/Cache/CacheService';
import {post} from '../../service/Rest/RestService';

const PrimeiroAcessoScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [senha, setSenha] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  const handleSubmit = () => {
    if(nome && nome != null
            && email && email != null
            && telefone && telefone != null
            && resumo && resumo != null
            && senha && senha != null){

      setErrorMsg(null);

      let deviceId = DeviceInfo.getDeviceId();
      let uniqueId = DeviceInfo.getUniqueIdSync();

      let device = {
        id: deviceId,
        uniqueId: uniqueId,
      }

      let user = {
        name: nome,
        resumo: resumo,
        phone: telefone,
        email: email
      }

      post('/auth/v/signup', {...user, password:senha, device:device}).then(response => {
        if(response.status == 201){
          handleSignin();
        } else {
          navigation.navigate('error');
        }
      }).catch(err => {
        console.log(err); 
        navigation.navigate('error');
      });
    } else {
      setErrorMsg('Preencha todos os campos obrigatórios (*) para continuar!');
    }
  }

  const handleSignin = () => {
    post('/auth/signin', {email:email, password:senha}).then(response => {
      if(response.status == 200){
        CacheService.register('@jwt', response.data.token)
          .then(() => navigation.navigate('inscricoes'))
          .catch((err) => console.log(err));
      }
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo} />

        <Label value='Informe seus dados para cadastro:' style={styles.title}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Seu nome*'
            value={nome} onChangeText={(val) => setNome(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Seu telefone (Ex.: 041995429288)*'
            value={telefone} onChangeText={(val) => setTelefone(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Seu email*'
            value={email} onChangeText={(val) => setEmail(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Sua senha*'
            value={senha} onChangeText={(val) => setSenha(val)}/>

        <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
            placeholder='Nos conte sobre você (profissão, experiência, etc)'
            value={resumo} onChangeText={(val) => setResumo(val)}/>

        {renderError()}

        <Button label={'Pronto!'} onPress={() => handleSubmit()}/>

        <Label value='Fique tranquilo(a)! Não compartilharemos seus dados com terceiros.'
            style={styles.legend}/>
      </ScrollView>
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
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  txtArea:{
    borderRadius:10,
    marginVertical: 5,
    marginBottom:20,
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  legend:{
    fontSize:12
  },
});

export default PrimeiroAcessoScreen;