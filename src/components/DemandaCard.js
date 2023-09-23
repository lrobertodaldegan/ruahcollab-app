import {useState, useEffect} from 'react';
import{
  StyleSheet,
  Dimensions,
  View,
  Linking
} from 'react-native';
import { 
  faCalendarDays, 
  faPlaceOfWorship,
  faLocationDot,
  faPhone,
  faEnvelope,
  faCheckCircle,
  faWind,
} from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import Icon from './Icon';
import DetalheDemandaLabel from './DetalheDemandaLabel';
import Button from './Button';
import { post, get } from '../service/Rest/RestService';
import Loader from './Loader';

const DemandaCard = ({item, errorHandler=()=>null}) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    get('/subscription', () => errorHandler())
    .then(response => {
      if(response.status === 200){
        response.data.map(sub => {
          if(sub.demand.id === getDemand().id)
            setStatus(sub.status);
        });
      }

      setLoading(false);
    });
  }, []);

  const getDemand = () => {
    if(item.demand){
      return item.demand;//item == subscription
    } else {
      return item;//item == demand
    }
  }

  const handleSubscription = () => {
    setLoading(true);

    let body = {
      demandId:getDemand().id
    }

    post('/subscription', body, () => errorHandler())
    .then(response => {
      if(response.status === 201)
        setStatus('pendente');

      setLoading(false);
    });
  }

  const getStatusComponent = () => {
    if(loading){
      return <Loader color='#fafafa'/>
    } else {
      if(item){
        if(status === 'aceito'){
          return (
            <>
              <View style={styles.statusWrap}>
                <Icon icon={faCheckCircle} size={24} style={styles.statusIcon}/>
                <Label value='VOCÊ FOI ACEITO!!!' style={styles.statusLbl}/>
              </View>

              <Label value='Entre em contato com a instituição ou aguarde entrarem em contato com você!' 
                  style={styles.statusLegend}/>
            </>
          );
        }

        if(status === 'pendente'){
          return (
            <>
              <View style={styles.statusWrap}>
                <Label value='Inscrição enviada...' style={styles.statusLbl}/>
              </View>

              <Label value='Sua inscrição foi enviada, mas ainda não foi aceita.' 
                  style={styles.statusLegend}/>
            </>
          );
        }

        return (
          <>
              <View style={styles.statusWrap}>
                <Button label='RUAH' icon={faWind} style={styles.ruahBtn}
                    labelStyle={styles.ruahBtnLbl} iconStyle={styles.ruahBtnIcon}
                    onPress={() => handleSubscription()}/>
              </View>

              <Label value='Ao clicar no botão, enviaremos sua inscrição na demanda para a instituição.' 
                  style={styles.statusLegend}/>
            </>
        );
      }
    }
  }

  return (
    <View style={styles.wrap}>
      <Label value={getDemand().title} style={styles.title}/>

      <Label value={getDemand().resume} style={styles.desc}/>

      <View style={styles.instituicaoWrap}>
        <DetalheDemandaLabel label={getDemand().recurrence} 
            icon={faCalendarDays}/>

        <DetalheDemandaLabel label={getDemand().institution?.name} 
            action={async () => getDemand().institution?.site ? await Linking.openURL(`${getDemand().institution?.site}`) : null}
            icon={faPlaceOfWorship}/>

        <DetalheDemandaLabel label={getDemand().institution?.address} 
            action={async () => await Linking.openURL(`geo:0,0?q=${getDemand().institution?.address}`)}
            icon={faLocationDot}/>

        <DetalheDemandaLabel label={getDemand().institution?.contactPhone 
                                      ? getDemand().institution?.contactPhone 
                                      : getDemand().institution?.phone }
            action={async () => await Linking.openURL(`tel:${getDemand().institution?.contactPhone ? getDemand().institution?.contactPhone : getDemand().institution?.phone}`)}
            icon={faPhone}/>

        <DetalheDemandaLabel label={getDemand().institution?.contactEmail
                                      ? getDemand().institution?.contactEmail
                                      : getDemand().institution?.email}
            action={async () => await Linking.openURL(`mailto:${getDemand().institution?.contactEmail ? getDemand().institution?.contactEmail : getDemand().institution?.email}`)} 
            icon={faEnvelope}/>
      </View>

     {getStatusComponent()}
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width:size.width - 40,
    minHeight: (size.height /2 ),
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
  instituicaoWrap:{
    marginVertical:10
  },
  statusWrap:{
    flexDirection:"row",
    alignItems:'center',
    marginTop:20
  },
  statusIcon:{
    color:'#fafafa'
  },
  statusLbl:{
    color:'#fafafa',
    fontFamily:'Montserrat-Bold',
    fontSize:20,
    marginLeft:10
  },
  statusLegend:{
    color:'#fafafa',
    fontSize:12,
    marginTop:10,
    textAlign:'center'
  },
  ruahBtn:{
    backgroundColor:'#FCF3ED',
    width:'95%'
  },
  ruahBtnIcon:{
    color:'#8A4A20'
  },
  ruahBtnLbl:{
    marginRight:10,
    fontSize:20,
    fontFamily:'Montserrat-Bold',
    color:'#8A4A20'
  },
});

export default DemandaCard;