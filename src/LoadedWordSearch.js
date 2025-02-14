import logo from './logo.svg';
import { useParams, Link, useNavigate, NavLink } from "react-router-dom";
import './App.css';
import BeliefList from './BeliefList';
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import { fetchData, apiURL } from './api/fetchData';
import { TextField, Box, Flex, Button, TextArea, Heading, Text, Callout} from '@radix-ui/themes';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import LoadedWordList from './LoadedWordList';



function LoadedWordSearch() {
  const { setSearchedForLoadedWord, searchedForLoadedWord} = useContext(DataContext);

  //setSearchedForBelief("sdfsd");
  // const [test, setLoadedWordList] = useState('initial');

  const [loadedWordList, setLoadedWordList] = useState(null);


  const navigate = useNavigate();

  useEffect(() =>{

    async function init(){
      if(!loadedWordList) 
        await getAllLoadedWords();

    }

    
        init()
  
    const cleanUp = () => {
        // isMounted = false;
        // controller.abort()
        console.log('cleanup called')
        // source.cancel();
    }
  
    return cleanUp;
  },[]);

  const searchForLoadedWord = async (loadedWord) => {
    console.log(searchedForLoadedWord)
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
    const headers =  {
            'filter': searchedForLoadedWord,
            'MyCustomHeader2': '2'
        }
        // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    // let fetchedLoadedWords = await fetchData('http://localhost:4500/loadedWords', headers);
        let fetchedLoadedWords = await fetchData(apiURL + '/loadedWords');

    console.log(fetchedLoadedWords);
    //set word list which will be used to create cards on next page
    setLoadedWordList(fetchedLoadedWords?.response?.data);
    console.log(fetchedLoadedWords.response.data);

     navigate('/loadedWords')
    
  }
 async function getAllLoadedWords() {

    
        // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    // let fetchedLoadedWords = await fetchData('http://localhost:4500/loadedWords', headers);
        let fetchedLoadedWords = await fetchData(apiURL + '/loadedWords');

    console.log(fetchedLoadedWords);
    //set word list which will be used to create cards on next page
    setLoadedWordList(fetchedLoadedWords?.response?.data);
    console.log(fetchedLoadedWords.response.data);

   //  navigate('/loadedWords')
    
  }

  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
  //  <>
  //   <input
  //       id="searchLoadedWord"
  //       type="text"
  //       placeholder="Search for a loaded word/phrase"
  //       //value={search}
  //       onChange={(e) => setSearchedForLoadedWord(e.target.value)}
  //     />  
  //     <button onClick={searchForLoadedWord}>Search</button>
  //     <h2>Note that this search feature is still under improvement</h2>
  //   </>
    <div class='container'>
    {/* can center this horizontally in the flex container and since its row flex the next element will be after it*/}
    {/* <Flex justify="center" > 
     
     
     <Box width="500px">
       <TextField.Root placeholder="Leave empty to see all loaded Words" size="3"  onChange={(e) => setSearchedForLoadedWord(e.target.value)}>
         <TextField.Slot>
           <MagnifyingGlassIcon height="16" width="16" />
         </TextField.Slot>
       </TextField.Root>
     </Box>
     <Button variant="solid" size='3' onClick={searchForLoadedWord}>
          Search
       </Button>
    </Flex> */}
    <h3>Loaded Words</h3>
    <Callout.Root mb='2' color='gold' highContrast>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text m='0'>
                  <Text  size='3'>Read <a class='color--blue' href='/insights/6711426f17c988b343ec8077'>this</a> to learn what a loaded/term phrase is.
                  <br></br><br></br>
                  Note: We will be releasing more loaded words and how to free yourself of them in the future. <a class='color--blue' href="/createAccount" >Create an account</a> to be notified of new and early releases. 
                  
                  </Text>

                 
                  </Callout.Text>
                </Callout.Root>
   
    { loadedWordList && <div class="fbox-wrapper">
						<div class="row row-cols-1 row-cols-md-3 rows-3">  {    <LoadedWordList listToDisplay={loadedWordList}></LoadedWordList>}
          </div>
            </div>}



    {/* <Callout.Root mt='5' color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
          Read
        <HoverCard.Root>
            <HoverCard.Trigger>
              <Link>this</Link>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <SignupInfo></SignupInfo>
            </HoverCard.Content>
            
	</HoverCard.Root> to learn what a loaded/term phrase is
</Callout.Text>
  </Callout.Root> */}

    {/* <h2>Note that this search feature is still under improvement</h2> */}
    

    <h5>A loaded word you wanted to analyze not here? <a class='color--blue' href={process.env.REACT_APP_CONTACT_FORM}>Submit your loaded word for review by our experts.</a> Select "Contribute a loaded word/phrase and you will be notified if the word gets added to the app.</h5>
    
     </div>
    
   
  );
}

export default LoadedWordSearch;

