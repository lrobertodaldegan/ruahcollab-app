import{
  StyleSheet,
  Dimensions,
  View,
  Linking,
} from 'react-native';
import { 
  faLocationDot,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import DetalheDemandaLabel from './DetalheDemandaLabel';

const InstitutionCard = ({item}) => {
  return (
    <View style={styles.wrap}>
      <Label value={item.name} style={styles.title}/>

      <Label value={item.resume} style={styles.desc}/>

      <View style={styles.instituicaoWrap}>
        <DetalheDemandaLabel 
            action={async () => await Linking.openURL(`geo:0,0?q=${item.address}`)}
            label={item.address} icon={faLocationDot}/>

        <DetalheDemandaLabel icon={faPhone} 
            action={async () => await Linking.openURL(`tel:${item.contactPhone ? item.contactPhone : item.phone}`)}
            label={item.contactPhone ? item.contactPhone : item.phone } 
        />

        <DetalheDemandaLabel icon={faEnvelope} 
            action={async () => await Linking.openURL(`mailto:${item.contactEmail ? item.contactEmail : item.email}`)}
            label={item.contactEmail ? item.contactEmail : item.email} 
        />
      </View>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width:size.width - 40,
    minHeight: (size.height /2.7 ),
    backgroundColor:'#8A4A20',
    borderRadius:10,
    marginVertical:10,
    alignItems:'center',
    paddingVertical:20,
    paddingHorizontal:10
  },
  title:{
    color:'#fafafa',
    fontFamily:'Montserrat-Bold',
  },
  desc:{
    color:'#fafafa',
    marginVertical:5,
  },
});

export default InstitutionCard;