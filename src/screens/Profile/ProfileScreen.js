import {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Label from '../../components/Label';
import ErrorLabel from '../../components/ErrorLabel';
import {get, put} from '../../service/Rest/RestService';
import CacheService from '../../service/Cache/CacheService';

const ProfileScreen = ({navigation}) => {
  const [nome, setNome] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [senha, setSenha] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Salvar');

  useEffect(() => {
    get('/user', () => navigation.navigate('login')).then(response => {
      if(response.status == 200){
        let user = response.data;

        setTelefone(user.phone);
        setResumo(user.resume);
        setNome(user.name);
      }
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }, []);

  const handleSubmit = async () => {
    if(nome && nome != null
            && telefone && telefone != null
            && resumo && resumo != null){

      setErrorMsg(null);

      let body = {
        phone:telefone,
        resume:resumo,
        name:nome,
      }

      if(senha && senha != null)
        body.password = senha;

      put('/user', body, () => navigation.navigate('login')).then(response => {
        if(response.status == 200)
          setBtnLbl('Salvo!');
      }).catch(err => {console.log(err); navigation.navigate('error');});
    } else {
      setErrorMsg('Preencha todos os campos obrigatórios (*) para continuar!');
    }
  }

  const handleLogout = () => {
    CacheService.wipe('@jwt').then(() => navigation.navigate('welcome'));
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
        <Header navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.formWrap}>
          <Label value='Perfil' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Seu novo nome*'
              value={nome} onChangeText={(val) => setNome(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Seu novo telefone*'
              value={telefone} onChangeText={(val) => setTelefone(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Sua nova senha'
              value={senha} onChangeText={(val) => setSenha(val)}/>

          <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
              placeholder='Seu novo resumo'
              value={resumo} onChangeText={(val) => setResumo(val)}/>

          {renderError()}

          <Button label={btnLbl} onPress={() => handleSubmit()}/>

          <Label value='Caso precise trocar seu e-mail, entre em contato com o nosso time.'
              style={styles.legend}/>
        
          <Button label={"Sair"} onPress={() => handleLogout()}
              style={styles.lightBtn} labelStyle={styles.lightBtnLbl}/>
        
        </ScrollView>
        
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
  formWrap:{
    height:size.height - 30
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
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  txtArea:{
    borderRadius:10,
    marginVertical: 5,
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  legend:{
    fontSize:12,
    marginBottom:30
  },
  lightBtn: {
    backgroundColor:'#FCF3ED'
  },
  lightBtnLbl: {
    color:'#8A4A20',
  },
});

export default ProfileScreen;