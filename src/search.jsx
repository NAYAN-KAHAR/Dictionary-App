import {useEffect,useState} from 'react';
import axios from 'axios';

const SearchPage = () => {  
  const[word, setWord] = useState('');
  const[data, setData] = useState();

  const handleBtn = () => {
    const search = document.querySelector('#search').value;
    document.querySelector('#search').value = '';
    setWord(search);
  }

const getData = () => {
  axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
        console.log(response.data[0]);
        setData(response.data[0])
    })
    .catch((err) => {
      console.log(err);
    })
}
  useEffect(() => {
      getData();   
  },[word]);

  return (
      <>
      <div className="container mt-4">
      <div className="row justify-content-center">
      <div className="col-lg-6 col-mb-9 col-sm-12 mt-2">
      <div className="card">
      <div className="card-body">
        <h4 className="text-center"><b>Dictionary</b></h4>
        <div className="d-flex mt-4">  
        <input type="text" id="search" className="form-control" placeholder="Search any word here"/>
        <button onClick={handleBtn} className="btn btn-sm btn-primary mx-2">Search</button>
        </div>
        {data?<div className="mt-4 mx-3">
        <h5><b>Word  : { data.word}</b></h5>
        <p>Part Of Speech : {data.meanings[0].partOfSpeech}</p>
        <p><u>Defination</u> : {data.meanings[0].definitions[0].definition }</p>
        {data.meanings[0].synonyms[0] ?
        <p><u>Synonyms</u> : {data.meanings[0].synonyms[0] }</p>  
        :''}
        {data.meanings[0].definitions[0].example ?
        <p><u>Example</u> : {data.meanings[0].definitions[0].example }</p>  
        :''}
        

        <button onClick={()=>window.open(data.sourceUrls[0],'_blank')}
         className="btn btn-sm btn-outline-success">Read More</button>
        </div>
        :''
        }

        </div></div>      
      </div></div></div>
      </>
  );
}

export default SearchPage;
