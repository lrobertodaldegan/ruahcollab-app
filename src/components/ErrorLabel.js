import { 
  Text,
  StyleSheet,
} from "react-native";


const ErrorLabel = ({value, style={}}) => {
  return (
    <Text style={[styles.lbl, style]}>{value}</Text>
  );
}

const styles = StyleSheet.create({
  lbl:{
    color:'red',
    fontSize:16,
    fontFamily:'Montserrat-Regular',
    marginBottom:10,
    marginTop:10
  }
});

export default ErrorLabel;