import {useState} from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput
} from "react-native";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import {post} from "../../service/Rest/RestService";
import CacheService from '../../service/Cache/CacheService';

const ResetCodeValidationScreen = ({navigation}) => {
  const [code, setCode] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Validar');

  const handleValidation = () => {
    if(code && code > 0){
      setBtnLbl('Validando...');

      post('/user/code', {code:code}).then(response => {
        if(response.status == 200 && response.data.token){
          CacheService.register('@jwt', response.data.token)
            .then(() => navigation.navigate('resetLogin'))
            .catch((err) => console.log(err));
        }
      }).catch(err => {console.log(err);navigation.navigate('error');});
    } else {
      setBtnLbl('Código inválido!');
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Confirme o código enviado para o seu e-mail:'/>

          <TextInput style={styles.input} placeholderTextColor='#b57145' 
              onChangeText={(val) => setCode(val)} value={code}
              secureTextEntry={true}
              placeholder='Seu código (Ex.: 7777)'/>

          <Button label={btnLbl} onPress={() => handleValidation()}/>
        </View>
      </ScrollView>
    </>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
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

export default ResetCodeValidationScreen;