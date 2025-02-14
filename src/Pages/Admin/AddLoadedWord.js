import React from 'react'
import DataContext from '../../context/DataContext';
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchData, postData, putData, apiURL} from '../../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../../Components/TextEditor';
import { Button } from '@radix-ui/themes';

import { checkIfAdmin } from './utility';


const AddLoadedWord = () => {

    //shoudl be null on each refresh which will force a new pull and get new conditions added
    const [loadedWord, setLoadedWord ] = useState(null);
    const [why, setWhy ] = useState(null);
  
   const [thirdPartyDefinition, setThirdPartyDefinition ] = useState(null);
    const [examples, setExamples ] = useState(null);
    const [sourceLink, setSourceLink ] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);


    const { id } = useParams();
    const navigate = useNavigate();

    
    const fetchLoadedWord = async (loadedWord) => {
     
      let fetchedLoadedWord = await fetchData(apiURL+ `/loadedWords/${id}`);
      console.log(fetchedLoadedWord);
      fetchedLoadedWord = fetchedLoadedWord?.response?.data
      //set word list which will be used to create cards on next page
      setLoadedWord(fetchedLoadedWord?.loadedWord);
      setWhy(fetchedLoadedWord?.why);
      console.log(fetchedLoadedWord);
    
       //navigate('/loadedWords')
      
    }

    checkIfAdmin(setIsAdmin);     

    //if get to edit with an id fetch the word to dipslya and edit
    if(id && !loadedWord)
    {
      fetchLoadedWord();
    }

    // useEffect(() =>{

    //   if(!loadedWordToDisplay) //belief hasnt been retrieved for this session (not in localstorage or current state), prob came here by direct link instead fof rom search page
    //       fetchLoadedWord(id);
      
    
    
    //   const cleanUp = () => {
    //       // isMounted = false;
    //       // controller.abort()
    //       console.log('cleanup called')
    //       // source.cancel();
    //   }
    
    //   return cleanUp;
    // },[loadedWordToDisplay]);
    
async function handleSubmit(e) {
  //e.preventDefault();

  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
   
  const loadedWordToAdd = {
    "loadedWord": loadedWord,
    "why": why,  
    "examples": examples

};


  if(!id) 
    {
    
      let addLoadedWordResponse = await postData(apiURL + `/loadedWords/`, loadedWordToAdd);
      console.log(addLoadedWordResponse)
      navigate(`/loadedwords`)
     
    } else{
      //edit
      console.log(loadedWordToAdd)
     let put =  await putData(apiURL + `/loadedWords/${id}`, loadedWordToAdd)
     console.log(put)
     navigate(`/loadedwords/${id}`)
    }

}
  
   return (
    isAdmin && <div>
      <label>
          Loaded Word/phrase:
          <input
            type="text"
            name="condition"
            value={loadedWord}
             onChange={(e) => setLoadedWord(e.target.value)}
          />
        </label>
        <h2>Why it's a loaded word</h2>
        <TextEditor initText={why} childToSet={setWhy}></TextEditor>
        <h2></h2>

        {/* <label>
          Examples:
         
        </label>
        <TextEditor childToSet={setExamples}></TextEditor> */}
  

        {/* <button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create Loaded Word</button> */}

        {id ? <Button onClick={handleSubmit}>Edit</Button > : <Button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create  Loaded Word</Button>}



    </div>
    
  )
}

export default AddLoadedWord


