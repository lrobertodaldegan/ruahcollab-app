import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Logo from '../../components/Logo';

const WelcomeScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <Label value='Frase de efeito' style={styles.lbl}/>

        <Button label={'Primeiro acesso'} style={styles.lightBtn} labelStyle={styles.lightBtnLbl}
            onPress={() => navigation.navigate('primeiroAcesso')}/>

        <Button label={'Entrar'} onPress={() => navigation.navigate('login')}/>
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
    fontFamily:'Montserrat-Italic',
    marginVertical:80
  },
  lightBtn: {
    backgroundColor:'#F8E3D6'
  },
  lightBtnLbl: {
    color:'#8A4A20',
  }
});

export default WelcomeScreen;