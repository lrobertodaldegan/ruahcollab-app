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

              <Label value={`Entre em contato com a instituição\nou aguarde entrarem em contato com você!`}
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

              <Label value={`Sua inscrição foi enviada,\nmas ainda não foi aceita.`}
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

              <Label value={`Ao clicar no botão, enviaremos sua inscrição\nna demanda para a instituição.`}
                  style={styles.statusLegend}/>
            </>
        );
      }
    }
  }

  const renderContactPhone = () => {
    let contactPhone = getDemand().institution?.contactPhone;

    if(!(contactPhone && contactPhone !== null && contactPhone.length > 3)){
      contactPhone = getDemand().institution?.phone;
    }

    if(contactPhone && contactPhone !== null && contactPhone.length > 3){
      return (
        <DetalheDemandaLabel label={contactPhone}
            action={async () => await Linking.openURL(`tel:${contactPhone}`)}
            icon={faPhone}
        />
      )  
    } else {
      return <></>
    }
  }

  const renderContactEmail = () => {
    let contactEmail = getDemand().institution?.contactEmail;

    if(!(contactEmail && contactEmail !== null && contactEmail.length > 3)){
      contactEmail = getDemand().institution?.email;
    }

    if(contactEmail && contactEmail !== null && contactEmail.length > 3){
      return (
        <DetalheDemandaLabel label={contactEmail}
            action={async () => await Linking.openURL(`mailto:${contactEmail}`)} 
            icon={faEnvelope}
        />
      )
    } else {
      return <></>
    }
  }

  const getSiteAction = () => {
    if(getDemand().institution?.site 
        && getDemand().institution?.site !== null
        && getDemand().institution?.site.length > 3){
      return async () => await Linking.openURL(`${getDemand().institution?.site}`)
    } else {
      return () => null
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
            action={getSiteAction}
            icon={faPlaceOfWorship}/>

        <DetalheDemandaLabel label={getDemand().institution?.address} 
            action={async () => await Linking.openURL(`geo:0,0?q=${getDemand().institution?.address}`)}
            icon={faLocationDot}/>

        {renderContactPhone()}

        {renderContactEmail()}
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