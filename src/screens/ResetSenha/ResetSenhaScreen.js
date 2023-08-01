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
import Logo from '../../components/Logo';
import Label from '../../components/Label';

const ResetSenhaScreen = ({route, navigation}) => {
  const [email, setEmail] = useState(null);

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Label value='Confirme seu e-mail:' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Seu email'
              value={email} onChangeText={(val) => setEmail(val)}/>

          <Button label={'Enviar link'} onPress={() => navigation.navigate('welcome')}/>
          
          <Label value='Enviaremos um link para reset de senha automático.'
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
    marginTop:120,
    marginBottom:80
  },
  input:{
    borderRadius:10,
    marginVertical: 5,
    marginBottom:80,
    width:size.width - 40,
    height: 50 ,
    paddingHorizontal:10,
    borderColor:'#F8E3D6',
    borderWidth:2,
    fontFamily:'Montserrat-Regular'
  },
  legend:{
    fontSize:12
  },
});

export default ResetSenhaScreen;