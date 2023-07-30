import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Icon from "./Icon";
import { faWind, faSearch, faWarehouse } from '@fortawesome/free-solid-svg-icons'


const Footer = ({selected='home', navigation}) => {
  return (
    <View style={styles.footer}>
      
      <TouchableHighlight underlayColor='#fafafa'
          onPress={() => navigation.navigate('pesquisa')}
          style={[styles.footerIconWrap, selected === 'pesquisa'
                                                  ? styles.footerIconWrapSelected 
                                                  : {} ]}>

        <Icon size={22} icon={faSearch} 
            style={[styles.footerIcon, selected === 'pesquisa' 
                                                  ? styles.footerIconSelected 
                                                  : {}]} />
      </TouchableHighlight>

      <TouchableHighlight underlayColor='#fafafa' 
          onPress={() => navigation.navigate('inscricoes')}
          style={[styles.footerIconWrap, selected === 'inscricoes'
                                                    ? styles.footerIconWrapSelected 
                                                    : {} ]}>

        <Icon size={22} icon={faWind} 
            style={[styles.footerIcon, selected === 'inscricoes' 
                                                  ? styles.footerIconSelected 
                                                  : {}]} />
      </TouchableHighlight>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  footer:{
    flexDirection:'row',
    position:'absolute',
    bottom:70,
    paddingHorizontal:size.width/4,
    paddingVertical:20,
    width:size.width,
    justifyContent:'space-between',
    backgroundColor:'#fafafa',
  },
  footerIconWrap:{
    borderRadius:5,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  footerIconWrapSelected:{
    backgroundColor:'#8A4A20'
  },
  footerIcon:{
    color:'#8A4A20'
  },
  footerIconSelected:{
    color:'#fafafa'
  },
});

export default Footer;