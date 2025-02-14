import logo from './logo.svg';
import './App.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import parse from 'html-react-parser';

import DataContext from './context/DataContext';

import { checkIfAdmin } from './Pages/Admin/utility';


import { fetchData, deleteData, apiURL } from './api/fetchData';
import { Heading, Button, AlertDialog, Flex } from '@radix-ui/themes';


 function LoadedWordPage() {
    const { searchedForBelief, beliefToDisplay, setBeliefToDisplay } = useContext(DataContext);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadedWordToDisplay, setLoadedWordToDisplay] = useState(null);

    const { id } = useParams();

   //HAVE TO DO CHECKS OF STATE IN CASE THIS ITS EMPY. CNA HAPPEN IF SOMEONE JUMPS TO PAGE WITHOUT BUTTONS CLICKS. IF EMPYT HAVE TO LOAD 
   const deleteWord = async () => {
    console.log(id)
    console.log(`id we lliking for ${id}`)
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    let reqBody = {'id':id}
    let deletedWord = await deleteData( apiURL + `/loadedwords/${id}`, reqBody);
    console.log(`deleted word for 1 pager is ${deletedWord.response}`);
    //console.log(deletedBelief?.response.data);

    //deletedBelief = deletedBelief.response.data

    //going to this page means we fetch a belief that wont have conditions field of objects set 
    
      setLoadedWordToDisplay(null)
      navigate('/loadedwordsearch')

}
    
const fetchLoadedWord = async (loadedWord) => {
  //console.log(`in searchfor beleif method and got ${test}` + searchedForBelief);
  //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through

  //CHECK IF DIDNT GET DATA'
  //HAVE TO ADD FILTER -nvm this is to pull up all relevant beliefs; set request header; let fetch data accept header object as a parm,
//   axios.get('/users', {
//     headers: {
//         'MyCustomHeader1': '1',
//         'MyCustomHeader2': '2'
//     }
// })

  let fetchedLoadedWords = await fetchData(apiURL +`/loadedWords/${id}`);
  console.log(fetchedLoadedWords);
  //set word list which will be used to create cards on next page
  setLoadedWordToDisplay(fetchedLoadedWords?.response?.data);
  console.log(fetchedLoadedWords.response.data);

   //navigate('/loadedWords')
  
}


useEffect(() =>{

  if(!loadedWordToDisplay) //belief hasnt been retrieved for this session (not in localstorage or current state), prob came here by direct link instead fof rom search page
      fetchLoadedWord(id);
      checkIfAdmin(setIsAdmin); 
  


  const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }

  return cleanUp;
},[loadedWordToDisplay]);

    
  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead

   loadedWordToDisplay?.loadedWord ? <div class='container'>
    <h1>{loadedWordToDisplay?.loadedWord && 'Loaded Word: ' + loadedWordToDisplay.loadedWord}</h1>
    <h3>Why this is a loaded word:</h3>
     <p>{loadedWordToDisplay?.why && parse(loadedWordToDisplay.why)}</p>
    {/* <>
      {loadedWordToDisplay.examples.length > 0 ? <h3>Some examples</h3> <p>{loadedWordToDisplay.examples} </p> : <p></p>}
    </> */}
    <Flex>
           <Button size="3" highContrast onClick={() => navigate(`/posts/loadedWord/${id}/${loadedWordToDisplay.loadedWord}`)}>Discuss this loaded word/phrase with others</Button>
        </Flex>

    <br></br>
    <h5>Looking for more?</h5>
    <p>If you'd like to understand this word more or want additional help submit a request for help for additional support. <Link to="#">Get help with your unique situation. </Link> </p>
    
    <h5>Having something to add?</h5>
    <p>If there is anything here you think can be improved to this loaded word definition we'd love to hear it. We may update this page with your input.{<Link to="#">Contribute</Link>}</p>
    {isAdmin && <>
    <Button size='2' highContrast onClick={() => navigate(`/loadedWords/${id}/edit`)}>Edit</Button>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button color="red">Delete</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Delete: {loadedWordToDisplay.loadedWord}</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? This word/phrase will no longer be accessible and deleted from the DB
                
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red" onClick={deleteWord}>
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </>
 }
   </div>: <p>Loading..if this takes too long theres probably an error. Make sure the word you're searching for exists.</p>

   
     
  );
}

export default LoadedWordPage;



