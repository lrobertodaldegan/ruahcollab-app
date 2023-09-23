import {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import DemandaCard from '../../components/DemandaCard';
import InstitutionCard from '../../components/InstitutionCard';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {get} from '../../service/Rest/RestService';

const PesquisaScreen = ({navigation}) => {
  const [demands, setDemands] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const doSearch = (s, f) => {
    setLoading(true);
    setDemands([]);
    setInstitutions([]);

    let url = '/demand';

    if(s && s.length > 2)
      url = url + `?title=${s}`;

    get(url, () => navigation.navigate('login')).then(response => {
      if(response.status === 200){
        setDemands(response.data.demands);
        setInstitutions(response.data.institutions);

        let rs = [];

        if(f === null || f && f === 'demanda'){
          response.data.demands.forEach(d => {
            d.searchType='d';

            rs.push(d);
          });
        }

        if(f === null || f && f === 'instituicao'){
          response.data.institutions.forEach( i => {
            i.searchType='i';
            
            rs.push(i);
          });
        }

        setResults(rs);
      }

      setLoading(false);
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  const renderResults = () => {
    if(loading){
      return <ActivityIndicator color={'#8A4A20'}/>
    } else {
      return (
        <FlatList style={styles.content}
            keyExtractor={(item) => item._id ? item._id : item.id}
            data={results}
            renderItem={({item}) => {
              if(item.searchType === 'd'){
                let demand = {
                  ...item, 
                  institution:institutions.filter(i => i._id === item.institutionId)[0]
                }

                return <DemandaCard item={demand}/>
              } else {
                return <InstitutionCard item={item}/>
              }
            }}
        />
      )
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation} searchActive={true}
            searchAction={(s, f) => doSearch(s, f)}/>

        {renderResults()}
        <Footer navigation={navigation} selected='pesquisa'/>
      </View>
    </>
  );
}

const size = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:size.height,
    width:size.width,
    backgroundColor:'#fafafa',
    padding:20,
  },
  content:{
    marginBottom:120
  },
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
});

export default PesquisaScreen;