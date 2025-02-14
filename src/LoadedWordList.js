import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import SingleLoadedWordCard from "./SingleLoadedWordCard";
import { fetchData } from './api/fetchData';
import { Flex, Text, Heading, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { insertEvent } from "./util/trackingSiteBehavior";





function LoadedWordList({listToDisplay}) {
  const {setLoadedWordToDisplay, loggedInUser } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();


  let products = ['a','v'];
  //curretnly only set if user searches for a word which will set the loadedwordlist DS used to create list
  let loadedWordComponents;

  const butt = {
    // background: "transparent",
    border: "none",
    cursor: "pointer"
  };

  function displayBelief(beliefId) {
    //tell application what request to make to get data. another option is to use the beleif list already in memory but an admin couldve changed a belief. new feauture: user has to iniatea "refresh" which will update the beleif list or the single belief on page

    //setBeliefToDisplay()
    navigate(`/belief/${beliefId}`)

  }

  const fetchLoadedWord = async (idToSearchFor) => {
    console.log(`id we lliking for ${idToSearchFor}`)
    const headers =  {
        'id': idToSearchFor 
    }
    console.log(headers);


    console.log(`wtf is headers nt working ${headers}`)
    let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    let fetchedLoadedWord = await fetchData(apiURL + `/loadedWords/${idToSearchFor}`);
    console.log(`fetched LW for 1 pager is ${fetchedLoadedWord.response}`);
    console.log(fetchedLoadedWord.response.data);

    setLoadedWordToDisplay(fetchedLoadedWord.response.data)
    navigate(`/loadedWords/${idToSearchFor}`)

}
  
  //filter loadedwords based on search
  if (listToDisplay)
  {
     loadedWordComponents = listToDisplay.map((loadedWord,i) =>
      <a  key={loadedWord._id} style={butt} onClick={async(e) => {
        let usageData = {
          page: location.pathname,
          username: loggedInUser,
          metadata: {
            'card':'loadedWord',
            "objectName":`${loadedWord.loadedWord}`, 
             fileName:  'LoadedWordList.js'
             }, 
          action: 'click'
        }
        
       await insertEvent(usageData)
        setLoadedWordToDisplay(loadedWord)
        navigate(`/loadedWords/${loadedWord._id}`)
        // fetchLoadedWord(loadedWord._id)
      }}>
          <SingleLoadedWordCard loadedWord={loadedWord.loadedWord} why={loadedWord.why} examples={loadedWord.examples}/>
      </a>
      // <li  key={loadedWord._id}>
  
      // </li>
    );
    
  }
 
  
  //show list of single card components
  return (
    <>
    {/*    {listToDisplay ? <Flex wrap="wrap" align="" gap="1" className=""> {loadedWordComponents} </Flex> : <Callout.Root size="3" color="red">
 */}
   {listToDisplay ? <>{loadedWordComponents} </>  : <Callout.Root size="3" color="red">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
    Make sure you first search for a loaded word which you can do <Link to="/loadedWordSearch"> here</Link>
    </Callout.Text>
  </Callout.Root> }

   

  </>
   

  //  <Heading>Make sure you first search for a loaded word which you can do <Link to="/loadedWordSearch"> here</Link></Heading>
    // <div className="loadedWordList"> 
    //    {loadedWordComponents}
    // </div>

    
  );
}

export default LoadedWordList;


