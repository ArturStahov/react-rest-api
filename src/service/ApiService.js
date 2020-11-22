import axios from 'axios';

export default function ApiService(query,page=0){
   return axios
      .get(`http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`)
      .then(response=>response.data.hits)
}