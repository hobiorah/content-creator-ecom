import logo from './logo.svg';
import { useParams, Link, useNavigate } from "react-router-dom";
import './App.css';
import BeliefList from './BeliefList';
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import { fetchData, apiURL } from './api/fetchData';
import { TextField, Box, Flex, Button, TextArea, Heading, Callout} from '@radix-ui/themes';
import { InfoCircledIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

//require('dotenv').config();




function BeliefSearch() {
  const { searchedForBelief, setSearchedForBelief, setFetchBeliefs, setBeliefList, } = useContext(DataContext);
  //setSearchedForBelief("sdfsd");
  const [beliefListToDisplay, setBeliefListToDisplay ] = useState(null)

  const navigate = useNavigate();

  const searchForBelief = async (belief) => {
    console.log(`in searchfor beleif method and got` + searchedForBelief);
    //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through

    //CHECK IF DIDNT GET DATA'
    //HAVE TO ADD FILTER -nvm this is to pull up all relevant beliefs; set request header; let fetch data accept header object as a parm,
  //   axios.get('/users', {
  //     headers: {
  //         'MyCustomHeader1': '1',
  //         'MyCustomHeader2': '2'
  //     }
  // })
  //need to update so its a query param being sent not a header
    const headers =  {
            'filter': searchedForBelief,
            'MyCustomHeader2': '2'
        }
        console.log(process.env.REACT_APP_API_SERVER); 
        console.log(process.env.REACT_APP_PORT); 
        
        //http://localhost:4500/beliefs

  
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    let fetchedBeliefs = await fetchData(apiURL + '/beliefs', headers);
    fetchedBeliefs = fetchedBeliefs?.response?.data;
    // console.log(`bro after fetch ` + JSON.stringify(fetchedBeliefs));
   // console.log(apiURL);
    //use conditionsid to pull conditions from conditon table
    //console.log(fetchedBeliefs);
    //now have to loop through beleifs and udpate conditions field
    
    //let conditions = fetchedBeliefs.rootCauseOf;
    //loop through all beleifs to update conditions field  with object {name:name, conditionid:}
 //  let  fetchedBeliefs2 = fetchedBeliefs.map(async (belief,i) => 
    for( let i =0; i< fetchedBeliefs.length; i++)
      {
        //turn this into condition object array
        let conditions = fetchedBeliefs[i].rootCauseFor;
        //console.log(conditions)

        //if belief has root cause caonditions then build query param list to get all the conditions
        //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
        //https://stackoverflow.com/questions/68432496/how-to-turn-a-multiple-array-object-into-query-string-parameters-in-javascript
        if (conditions && conditions.length > 1 ) 
          {
            const conditionParams = new URLSearchParams();
            let  paramKey='list'
            conditions.forEach(condition => conditionParams.append(paramKey, condition));
            //console.log('params:', conditionParams.toString());
            
        
            
            //Adding to a URL
            const conditionListURL= new URL(apiURL +'/conditions')
            conditionListURL.search = conditionParams
            
            console.log('Full url:',conditionListURL)
            //get all condition objects based on conditionid. providing list to the api
            let conditionList = await fetchData(conditionListURL);
          //  console.log(conditionList);
            fetchedBeliefs[i].conditions = conditionList.response.data;
          }
          else if(conditions && conditions.length === 1) { //only one condition so use id api 
            
            let fetchedCondition = await fetchData(apiURL + `/conditions/${conditions[0]}/limited`, headers);
            fetchedBeliefs[i].conditions = [fetchedCondition.response.data];
          }

          // console.log('setting beleif list for belief list page')
          // console.log(belief)
          // Object.keys(belief).forEach((prop)=> console.log(prop));
          // console.log(JSON.stringify(belief));
          // console.log(JSON.stringify(belief.wtf));
          // console.log(belief.wtf)
         
    };

    // //  let  fetchedBeliefs2 = fetchedBeliefs.map(async (belief,i) => 
    //     {
    //       let conditions = belief.rootCauseOf;
    //       //console.log(conditions)
  
    //       //if belief has root cause caonditions then build query param list to get all the conditions
    //       if (conditions && conditions.length > 1 ) 
    //         {
    //         const conditionParams = new URLSearchParams();
    //         let  paramKey='list'
    //         conditions.forEach(condition => conditionParams.append(paramKey, condition));
    //         //console.log('params:', conditionParams.toString());
            
        
            
    //         //Adding to a URL
    //         const conditionListURL= new URL(apiURL +'/conditions')
    //         conditionListURL.search = conditionParams
            
    //         console.log('Full url:',conditionListURL)
    //         let conditionList = await fetchData(conditionListURL);
    //       //  console.log(conditionList);
    //         belief.wtf = conditionList.response.data;
    //         }
    //         else if(conditions && conditions.length === 1) { //only one condition so use id api 
  
    //           let fetchedCondition = await fetchData(apiURL + `/conditions/${conditions[0]}`, headers);
    //           belief.wtf = [fetchedCondition.response.data];
    //         }
  
    //         // console.log('setting beleif list for belief list page')
    //         // console.log(belief)
    //         // Object.keys(belief).forEach((prop)=> console.log(prop));
    //         // console.log(JSON.stringify(belief));
    //         // console.log(JSON.stringify(belief.wtf));
    //         // console.log(belief.wtf)
    //         console.log( 'bro im pissed ' + JSON.stringify(belief))
    //         return belief;
  
    //   })
     // Loop and append key/value to get conditions in belief
    

    
    // console.log(`bro fetchedbeleif2 should be set ` + JSON.stringify(fetchedBeliefs2));
    //  console.log(`bro fetched beleifs at end with for loop touched ` + JSON.stringify(fetchedBeliefs));
    //set beleif list which will be used to create belief cards on next page. if we updated state in component render process it would create loop
    // setBeliefList(fetchedBeliefs?.response?.data);
    setBeliefListToDisplay(fetchedBeliefs);

    //to build condttion list in card/page, loop through, print out and only add comma if not at length -1
    //  navigate('/beliefs')
    
  }

  useEffect(() =>{
    

  
   
  //WILL REMOVE WHEN WE ADD SEARCH
    if(!beliefListToDisplay) {
      searchForBelief()
    
         console.log('loop?')        
    }
    
  
    const cleanUp = () => {
        // isMounted = false;
        // controller.abort()
        console.log('cleanup called')
        // source.cancel();
    }
  
    return cleanUp;
  },[]);

  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
   <div class='container'>
    {/* <Flex justify="center" > 
   
      <Box width="700px">
        <TextField.Root placeholder="Leave empty to see all beliefs" size="3"  onChange={(e) => setSearchedForBelief(e.target.value)}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Button variant="solid" size='3' onClick={searchForBelief}>
          Search
        </Button>
    </Flex>



      <h2>Note that this search feature is still under improvement. You can find beliefs by condition as well.</h2> */}
  <Heading mb='2'>Insights to dismantle the following limiting beliefs</Heading>
  <Callout.Root highContrast mt='1' mb='2'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text m='0' size='2'>
          We will be releasing more of these belief dismantling solutions in the future. <Link to="/createAccount" >Create an account</Link> to be notified of new and early releases. 
          </Callout.Text>
  </Callout.Root>
      {/* <div className="beliefList"> </div> */}
      {beliefListToDisplay && <Flex align="" gap="1" className=""><BeliefList passedInBeliefList={beliefListToDisplay}></BeliefList></Flex>}
      <h5 class='mt-2'>Can't find a belief you want help with? <a class='color--purple ' href='#'>Submit your belief for review by our experts.</a>You'll be notified if we'll produce a solution for it.</h5>

    </div>
    
   
  );
}

export default BeliefSearch;

