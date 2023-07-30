import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from './Icon';
import Label from './Label';

const Button = ({label, style={}, labelStyle={}, icon=null, iconStyle={}, iconPosition='r', 
                  onPress=()=>null}) => {
  
  const getIcon = () => {
    return icon === null ? <></>
                         : <Icon icon={icon} size={18} style={[styles.icon, iconStyle]}/>;
  }
  
  return (
    <TouchableHighlight underlayColor='rgba(0,0,0,0)'
        style={[styles.btn, style]}
        onPress={() => onPress()}>
      <>
        {iconPosition === 'l' ? getIcon() : <></>}

        <Label value={label} style={[styles.lbl, labelStyle]}/>

        {iconPosition === 'r' ? getIcon() : <></>}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn:{
    flexDirection:'row',
    backgroundColor:'#8A4A20',
    width:Dimensions.get('screen').width - 40,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderRadius:10,
    marginVertical:5
  },
  lbl:{
    color: '#fafafa'
  },
  icon:{
    color: '#fafafa'
  }
});

export default Button;