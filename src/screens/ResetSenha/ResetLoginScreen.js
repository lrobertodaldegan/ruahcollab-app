import {useState} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput
} from "react-native";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Logo from "../../components/Logo";
import {put} from '../../service/Rest/RestService';


const ResetLoginScreen = ({navigation}) => {
  const [p, setP] = useState(null);
  const [enterLbl, setEnterLbl] = useState('Salvar');

  const handleLogin = () => {
    setEnterLbl('Salvando...');

    put('/user', {password:p}).then(response => {
      if(response.status == 200){
        navigation.navigate('inscricoes');
      } else {
        setEnterLbl('Ops! Tente novamente!');
      }
    }).catch(err => navigation.navigate('error'));
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo}/>

        <View style={styles.inputsWrap}>
          <Label value='Bem-vindo de volta!'/>

          <TextInput style={styles.input} placeholderTextColor='#b57145' 
              onChangeText={(val) => setP(val)} value={p}
              placeholder='Cadastre uma senha nova'/>
        </View>

        <View style={styles.btnWrap}>
          <Button label={enterLbl} onPress={() => handleLogin()}/>
        </View>
      </View>
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
    marginTop:50,
    alignSelf:'center'
  },
  inputsWrap:{
    marginTop: (size.height / 3.5) - 50
  },
  input:{
    borderRadius:10,
    borderWidth:1,
    borderColor:'#FCF3ED',
    height: 50,
    width: size.width - 40,
    marginTop:10,
    backgroundColor:'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  btnWrap:{
    marginTop: (size.height / 3.5) - 50
  },
  title: {
    fontSize:26,
    fontFamily:'Montserrat-Bold',
    marginBottom:5
  },
  legend: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ResetLoginScreen;