import axios from 'axios';
import CacheService from '../Cache/CacheService';

//const BASEURL = 'https://acaodoespirito.com.br/ruahcollab';
//const BASEURL = 'http://10.0.2.2:21017/ruahcollab';
const BASEURL = 'http://192.168.100.27:21017/ruahcollab';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');

    let response = await axios.get(`${BASEURL}${urlPath}`, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.post(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.delete(`${BASEURL}${urlPath}`, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const put = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.put(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

export {
  get,
  post,
  del,
  put,
}