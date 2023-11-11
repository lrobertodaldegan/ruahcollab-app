import {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Linking,
  TextInput
} from "react-native";
import Logo from "./Logo";
import Icon from "./Icon";
import { faCircleUser, faPlaceOfWorship, faLungs } from '@fortawesome/free-solid-svg-icons'
import Button from './Button';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/6851943298';

const link = 'https://rc.acaodoespirito.com.br';

const Header = ({navigation, 
                  searchAction=()=>null, 
                  handleChangeFilters=()=>null, 
                  text,
                  setText,
                  filter=null,
                  searchActive=false}) => {

  const getLeftComponent = () => {
    if(searchActive === true){
      return (
        <View style={styles.searchWrap}>
          <Logo style={styles.logoReduce}/>

          <TextInput style={styles.input} placeholderTextColor='#8A4A20'
              placeholder='Busque por demanda ou instituição'
              value={text} onChangeText={(val) => setText(val)}/>
        </View>
      );
    }
      
    return <Logo />;
  }

  const getFilters = () => {
    if(searchActive === true){
      return (
        <>
          <Button label='Pesquisar' style={styles.btn} 
              labelStyle={styles.btnLbl} onPress={() => searchAction(text, filter)}/>

          <View style={styles.filterOptsWrap}>
            <Button label='Instituição' icon={faPlaceOfWorship} 
                iconPosition='l' onPress={() => handleChangeFilters('instituicao')}
                iconStyle={[styles.btnIcon, filter === 'instituicao' 
                                                    ? styles.btnFilterLblSelected
                                                    : {}]}
                style={[styles.btn, styles.btnFilter, filter === 'instituicao' 
                                                              ? styles.btnFilterSelected
                                                              : {}]} 
                labelStyle={[styles.btnLbl, filter === 'instituicao' 
                                                    ? styles.btnFilterLblSelected
                                                    : {}]}
            />

            <Button label='Demanda' icon={faLungs} 
                iconPosition='l' onPress={() => handleChangeFilters('demanda')}
                iconStyle={[styles.btnIcon, filter === 'demanda' 
                                                    ? styles.btnFilterLblSelected
                                                    : {}]}
                style={[styles.btn, styles.btnFilter, filter === 'demanda' 
                                                              ? styles.btnFilterSelected
                                                              : {}]} 
                labelStyle={[styles.btnLbl, filter === 'demanda' 
                                                    ? styles.btnFilterLblSelected
                                                    : {}]}
            />
          </View>
        </>
      );
    }

    return <></>;
  }

  return (
    <>
      <View style={{alignItems:'center'}}>
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
            }}
        />
      </View>
      <View style={styles.header}>
        <TouchableHighlight underlayColor='#fafafa' 
              onPress={async () => await Linking.openURL(link)}>
          
          {getLeftComponent()}
        
        </TouchableHighlight>
        
        <TouchableHighlight underlayColor='#fafafa' onPress={() => navigation.navigate('profile')}>
          <Icon icon={faCircleUser} size={22} style={styles.hIcon}/>
        </TouchableHighlight>
      </View>

      {getFilters()}
    </>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fafafa',
    marginTop:10
  },
  hIcon: {
    color:'#8A4A20',
  },
  logoReduce:{
    height:40,
    width:40
  },
  searchWrap:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:5,
    height:50,
    borderRadius:50,
    backgroundColor:'rgba(248, 227, 214, 0.3)',
    width:size.width/1.3
  },
  input:{
    fontFamily:'Montserrat-Regular',
    fontSize:12,
    width:size.width - 150,
    marginLeft:5,
    color:'#8A4A20',
  },
  btn:{
    backgroundColor:'#fafafa',
    height:40,
  },
  btnFilter:{
    width:'50%',
    height:30
  },
  btnFilterSelected:{
    backgroundColor:'#8A4A20'
  },
  btnFilterLblSelected:{
    color:'#fafafa',
    fontFamily:'Montserrat-Bold'
  },
  btnLbl:{
    color:'#8A4A20',
  },
  btnIcon:{
    color:'#8A4A20',
    marginRight:5
  },
  filterOptsWrap:{
    flexDirection:'row'
  },
});

export default Header;