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
import Link from '../../components/Link';
import Logo from '../../components/Logo';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass]   = useState(null);

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Label value='Informe seus dados para entrar:' style={styles.lbl}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Seu e-mail'
              value={email} onChangeText={(val) => setEmail(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Sua senha'
              value={pass} onChangeText={(val) => setPass(val)}/>

          <Button label={'Entrar'} onPress={() => navigation.navigate('inscricoes')}/>

          <Link label='Esqueci a minha senha'/>
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
    borderColor:'#F8E3D6',
    borderWidth:2,
    fontFamily:'Montserrat-Regular'
  },
});

export default LoginScreen;