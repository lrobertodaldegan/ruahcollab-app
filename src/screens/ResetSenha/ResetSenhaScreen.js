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
import {post} from '../../service/Rest/RestService';

const ResetSenhaScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Enviar código');

  const handleSendLink = () => {
    setBtnLbl('Enviando...');

    post('/user/forgot', {email:email}).then(response => {
      if(response.status == 200){
        navigation.navigate('codeValidation');
      } else {
        navigation.navigate('error');
      }
    }).catch(err => {console.log(err);navigation.navigate('error');});
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Label value='Confirme seu e-mail:' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Seu email cadastrado'
              value={email} onChangeText={(val) => setEmail(val)}/>

          <Button label={btnLbl} onPress={() => handleSendLink()}/>
          
          <Label value='Enviaremos um código de confirmação para reset de senha ao o e-mail cadastrado.'
              style={styles.legend}/>
        </View>
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
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  legend:{
    fontSize:12
  },
});

export default ResetSenhaScreen;