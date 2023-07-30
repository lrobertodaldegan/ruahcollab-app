import { 
  StyleSheet,
  ImageBackground,
} from "react-native";
import logo from '../assets/img/Logo.png';

const Logo = ({style={}}) => <ImageBackground style={[styles.logo, style]} source={logo}/>

const styles = StyleSheet.create({
  logo:{
    width:50,
    height:50
  }
});

export default Logo;