import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import Label from '../../components/Label';

const ErrorScreen = ({navigation}) => {

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Label value='Ops! Houve um problema ao tentar concluir a ação. Que tal tentar novamente? :)' 
            style={styles.lbl}/>

        <Button label={'Tentar novamente'} style={styles.lightBtn} 
            labelStyle={styles.lightBtnLbl} onPress={() => navigation.goBack()}/>
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
  lbl:{
    marginTop:size.height/4,
    marginBottom:size.height/8
  },
  lightBtn: {
    backgroundColor:'#FCF3ED'
  },
  lightBtnLbl: {
    color:'#8A4A20',
  }
});

export default ErrorScreen;