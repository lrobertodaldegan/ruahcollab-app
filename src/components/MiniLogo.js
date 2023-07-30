import { 
  Image,
} from "react-native";
import logo from '../assets/img/logo_mini.png';

const MiniLogo = ({style={}}) => <Image style={[style]} source={logo}/>

export default MiniLogo;