import { 
  ActivityIndicator,
  StyleSheet
} from "react-native";


const Loader = ({margin=true, color='#8A4A20'}) => {
  return (
    <ActivityIndicator color={color} style={margin ? styles.loadingIco : {}}/>
  );
}

const styles = StyleSheet.create({
  loadingIco:{
    marginTop:50
  },
});

export default Loader;