import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import Label from './Label';
import Icon from './Icon';

const DetalheDemandaLabel = ({label, icon, action=()=>null}) => {
  return (
    <TouchableHighlight
        onPress={() => action()} underlayColor={'#8A4A20'}>
          
      <View style={styles.il}>
        <Icon icon={icon} size={18} style={styles.icon}/>

        <Label value={label} style={styles.detail}/>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  il:{
    flexDirection:'row',
    marginVertical:4
  },
  icon:{
    color:'#fafafa',
  },
  detail:{
    color:'#fafafa',
    fontSize:14,
    marginLeft:10,
    width:'85%'
  },
});

export default DetalheDemandaLabel;