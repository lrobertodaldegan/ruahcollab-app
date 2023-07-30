import{
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import { 
  faCalendarDays, 
  faPlaceOfWorship,
  faLocationDot,
  faLungs,
  faPhone,
  faEnvelope,
  faCheckCircle,
  faWind,
} from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import Icon from './Icon';
import DetalheDemandaLabel from './DetalheDemandaLabel';
import Button from './Button';

const DemandaCard = ({item}) => {

  const getStatusComponent = () => {
    if(item){
      if(item.status === 'aceito'){
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

      if(item.status === 'pendente'){
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
                  labelStyle={styles.ruahBtnLbl} iconStyle={styles.ruahBtnIcon}/>
            </View>

            <Label value='Ao clicar no botão, enviaremos sua inscrição na demanda para a instituição.' 
                style={styles.statusLegend}/>
          </>
      );
    }
  }

  return (
    <View style={styles.wrap}>
      <Label value={item.titulo} style={styles.title}/>

      <Label value={item.descricao} style={styles.desc}/>

      <View style={styles.instituicaoWrap}>
        <DetalheDemandaLabel label={item.recorrencia} 
            icon={faCalendarDays}/>

        <DetalheDemandaLabel label={item.instituicao.nome} 
            icon={faPlaceOfWorship}/>

        <DetalheDemandaLabel label={item.instituicao.endereco} 
            icon={faLocationDot}/>

        <DetalheDemandaLabel label={`${item.instituicao.qtdDemandas} demanda(s) cadastrada(s)`} 
            icon={faLungs}/>

        <DetalheDemandaLabel label={item.instituicao.telefone} 
            icon={faPhone}/>

        <DetalheDemandaLabel label={item.instituicao.email} 
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
    backgroundColor:'#F8E3D6',
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