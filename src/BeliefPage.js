import logo from './logo.svg';
import './App.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataContext from './context/DataContext';
import parse from 'html-react-parser'
import { fetchData, deleteData, apiURL } from './api/fetchData';
import { Button, AlertDialog, Flex } from '@radix-ui/themes';

import { checkIfAdmin } from './Pages/Admin/utility';




function searchForBelief(belief) {
  //move to belief list page; iterate through all beleifs and generate a single beleif component for each matching belief
  //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
}
 function BeliefPage() {
    const { searchedForBelief, setsearchedForBelief, beliefList, beliefToDisplay, setBeliefToDisplay } = useContext(DataContext);
    const { beliefId } = useParams();
    const [conditionLinks, setConditionLinks] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();


//get condition objects for beleif we're displaying so we can create hyperlinks
     function buildConditionLinks(belief) {

      //if there are no conditions field wont be set or have no length
      if(belief.conditions && belief.conditions.length >0)
      {
        let links = belief.conditions.map((condition,i) => {
          let link = `/condition/${condition._id}`
          console.log(link)
         return  <li key={condition._id}><Link to={link}>{condition.condition}</Link></li>
         
        });
          
        setConditionLinks(links);
  
      }
     
    }

    async function createConditionObjects(belief) {
       //turn this into condition object array
       let conditions = belief.rootCauseFor;
      //  let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
      //  let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;


       //console.log(conditions)

       //if belief has root cause caonditions then build query param list to get all the conditions
       //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
       //https://stackoverflow.com/questions/68432496/how-to-turn-a-multiple-array-object-into-query-string-parameters-in-javascript
       if (conditions && conditions.length > 1 ) 
         {
           const conditionParams = new URLSearchParams();
           let  paramKey='list';
           conditions.forEach(condition => conditionParams.append(paramKey, condition));
           //console.log('params:', conditionParams.toString());
           
           //Adding to a URL
           const conditionListURL= new URL(apiURL + '/conditions')
           conditionListURL.search = conditionParams
           
           console.log('Full url:',conditionListURL)
           //get all condition objects based on conditionid. providing list to the api
           let conditionObjects = await fetchData(conditionListURL);
         //  console.log(conditionList);
           belief.conditions = conditionObjects.response.data;
         }
         else if(conditions && conditions.length === 1) { //only one condition so use id api 

           let fetchedCondition = await fetchData(apiURL + `/conditions/${conditions[0]}`);
           belief.conditions = [fetchedCondition.response.data];
         }
         return belief
         //setBeliefToDisplay(belief)
    }
    const deleteBelief = async () => {
      console.log(beliefId)
      console.log(`id we lliking for ${beliefId}`)
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
     
      let reqBody = {'id':beliefId}
      let deletedBelief = await deleteData( apiURL + `/beliefs/${beliefId}`, reqBody);
      console.log(`deleted belief for 1 pager is ${deletedBelief.response}`);
      console.log(deletedBelief?.response.data);

      //deletedBelief = deletedBelief.response.data

      //going to this page means we fetch a belief that wont have conditions field of objects set 
      
        setBeliefToDisplay(null)
        navigate('/beliefSearch')
  
  }

    useEffect(() =>{
    

      const fetchBelief = async (idToSearchFor) => {
        console.log(`id we lliking for ${idToSearchFor}`)
        // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
        


        let fetchedBelief = await fetchData( apiURL + `/beliefs/${beliefId}`);
        console.log(fetchedBelief)
        if(fetchedBelief.response)
        {
          console.log(`fetched belief for 1 pager is ${fetchedBelief.response}`);
          console.log(fetchedBelief.response.data);
          fetchedBelief = fetchedBelief.response.data
         // setBeliefToDisplay(fetchedBelief)
         // console.log(fetchedBelief.conditions)
  
          //going to this page means we fetch a belief that wont have conditions field of objects set 
       
            console.log('get condition objects')
            //the belief document should have these field set with condition ids that are applied when a belief is created
           if(fetchedBelief?.rootCauseFor ||fetchedBelief?.rootCauseOf )
           {
            fetchedBelief = await createConditionObjects(fetchedBelief) 
            buildConditionLinks(fetchedBelief)
            console.log(fetchedBelief.conditions)
           }
           
          
          
            setBeliefToDisplay(fetchedBelief)
        }
       
    
    }


    
 async function init(){

  if(!beliefToDisplay) {//belief hasnt been retrieved for this session (not in localstorage or current state), prob came here by direct link instead fof rom search page
    fetchBelief(beliefId);

    console.log('loop?')
   
    
} 

  if(beliefToDisplay && !conditionLinks)
    {
      if(beliefToDisplay?.rootCauseFor ||beliefToDisplay?.rootCauseOf )
        {
          let newBeliefToDisplay = await createConditionObjects(beliefToDisplay) 
         buildConditionLinks(newBeliefToDisplay)
         console.log(newBeliefToDisplay.conditions)
         setBeliefToDisplay(currentState =>  ({...currentState, newBeliefToDisplay}))

        }
        
    }
  }

  init()
    

     
     
      checkIfAdmin(setIsAdmin); 
    
      const cleanUp = () => {
          // isMounted = false;
          // controller.abort()
          console.log('cleanup called')
          // source.cancel();
      }
    
      return cleanUp;
    },[beliefId, beliefToDisplay]);
    
    
    
    
    console.log('check for conditions and rootcause for field');
   

    //if there is a conditions object but conditionlinks havent been built, then we came from belief search page and hve to build the links
    if(beliefToDisplay?.rootCauseFor && !conditionLinks ) {
      console.log('get links')
      buildConditionLinks(beliefToDisplay)
    }
    console.log(beliefToDisplay);
    console.log(conditionLinks);
   
    
  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead

   <div class='container'> {beliefToDisplay ?
      <div class='container' className='beliefPage'>
        <h1>{beliefToDisplay.belief}</h1>
        <h4 class='mt-3'>Dismantling of the belief:</h4> 
        <p>{parse(beliefToDisplay.dismantlingOfBelief)}</p>
        <h5>Problems this belief can give rise to: </h5> 
        <ul class="simple-list text-decoration-underline color--">
          {conditionLinks? conditionLinks : 'This belief has not currently been documented to be the root cause for any conditions in our app. If you think this is incorrect please contact us or discuss in the forums.'}
        </ul>

        <h5>Have something to add?</h5>
        <p m='0'>If there is anything here you think can be improved to help someone dismantle this belief we'd love to hear it. We may update this page with your input.</p>
        <a class='btn btn-sm btn--black mb-2'  href={`/posts/belief/${beliefId}/${beliefToDisplay.belief}`} >Discuss this belief with us and others</a>

        <Flex>
          
        </Flex>
       
        
        {/* metaproblems will be links */}
        {/* <p>{beliefToDisplay.conditionsString}</p> */}

      

        <h5>Looking for more?</h5>
        <p>If you'd like to understand this belief more or want additional help dismantling it submit a request for help for additional support. <a class='color--blue' href="#">Get help with your unique situation. </a> </p>
        
       
        {isAdmin && 
        <>
          <Button size='2' highContrast onClick={() => navigate(`/belief/${beliefId}/edit`)}>Edit</Button>
          <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">Delete</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete belief: {beliefToDisplay.belief}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure? This belief will no longer be accessible and deleted from the DB
                  
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={deleteBelief}>
                      Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
         </>}
    </div> : "Loading..if too long the belief probably doesn't exist"

    }

   </div>
     
  );
}

export default BeliefPage;



