import {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Label from '../../components/Label';
import ErrorLabel from '../../components/ErrorLabel';
import Link from '../../components/Link';
import Logo from '../../components/Logo';
import {post} from '../../service/Rest/RestService';
import CacheService from '../../service/Cache/CacheService';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass]   = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Entrar');

  const handleSubmit = () => {
    if(email && email != null && pass && pass != null){
      setErrorMsg(null);

      CacheService.wipe('@jwt');

      setBtnLbl('Entrando...');

      post('/auth/signin', {email: email, password: pass}).then((response) => {
        if(response.status == 200){
          CacheService.register('@jwt', response.data.token);

          navigation.navigate('inscricoes');
        } else {
          setBtnLbl('Tente novamente!');
        }
      }).catch(err => {console.log(err); setBtnLbl('Tente novamente!');});
    }else{
      setErrorMsg('E-mail e senha são obrigatórios para entrar!');
    }
  }

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Label value='Informe seus dados para entrar:' style={styles.lbl}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Seu e-mail'
              value={email} onChangeText={(val) => setEmail(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Sua senha'
              value={pass} onChangeText={(val) => setPass(val)}/>

          {renderError()}

          <Button label={btnLbl} onPress={() => handleSubmit()}/>

          <Link label='Esqueci a minha senha' onPress={() => navigation.navigate('reset')}/>
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
    marginTop:120,
  },
  lbl:{
    marginTop:80,
    marginBottom:10
  },
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
});

export default LoginScreen;