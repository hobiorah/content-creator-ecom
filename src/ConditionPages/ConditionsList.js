import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import DataContext from '../context/DataContext';
import { useState, useEffect, useContext } from "react";
import SingleConditionCard from "./SingleConditionCard";
import { fetchData, apiURL } from '../api/fetchData';
import { Flex, Text, Heading, Callout, Progress, Spinner } from "@radix-ui/themes";
import { InfoCircledIcon } from '@radix-ui/react-icons'
import parse from 'html-react-parser';

import { hasAccessToObject, getAccessInfo } from "../api/userManagement";
import { determineIfLockedUtil } from "./conditionUtility";
import { insertEvent } from "../util/trackingSiteBehavior";





function ConditionList({passedInList, parentCondition}) {
   const { loggedInUser,conditionListToDisplay, setConditionListToDisplay, setBeliefListToDisplay, setConditionToDisplay} = useContext(DataContext);
  // const { loggedInUser} = useContext(DataContext);
  const location = useLocation();


  const navigate = useNavigate();
  const { conditionId, conditionType, conditionName} = useParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [cardsToDisplay, setCardsToDisplay] = useState(null)
  const [conditionListToDisplayl, setConditionListToDisplayl] = useState(null)
  
  let conditionComponents;


 if(passedInList)
 {
  console.log('are we not settting list??"',passedInList)
  // setConditionListToDisplayl(passedInList)

 }



  function displayCondition(conditionId) {
    //tell application what request to make to get data. another option is to use the beleif list already in memory but an admin couldve changed a belief. new feauture: user has to iniatea "refresh" which will update the beleif list or the single belief on page

    //setBeliefToDisplay()
    navigate(`/condition/${conditionId}`)

  }

  let what = 'bro what'

  //when we click a condition from the list this fires to get data for the condition page (will use data for rendering)
  const fetchCondition = async (idToSearchFor) => {
    console.log(`id we lliking for ${idToSearchFor}`)
    const headers =  {
        'id': idToSearchFor 
    }
    console.log(headers);


    console.log(`wtf is headers nt working ${headers}`)
    let fetchedCondition = await fetchData(apiURL + `/conditions/${idToSearchFor}`);
    console.log(`fetched condition for 1 pager is ${fetchedCondition.response}`);
    console.log(fetchedCondition.response.data);

  //get beleifs for condition - find beliefs that have this condition id 
  //set condition list so conditon page can use to render a beleif list

    // setConditionToDisplay(fetchedCondition.response.data)
    // let fetchedBeliefs = await fetchData(apiURL + `/beliefs/condition/${idToSearchFor}`);
    // console.log(fetchedBeliefs);
    // //set beleif list which will be used to create belief cards on next page
    // setBeliefListToDisplay(fetchedBeliefs?.response?.data);


   // console.log(fetchedBeliefs.response.data);
    navigate(`/condition/${idToSearchFor}`)

}




  const getConditions = async () => {
    //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
  
    //CHECK IF DIDNT GET DATA'
    //HAVE TO ADD FILTER -nvm this is to pull up all relevant beliefs; set request header; let fetch data accept header object as a parm,
  //   axios.get('/users', {
  //     headers: {
  //         'MyCustomHeader1': '1',
  //         'MyCustomHeader2': '2'
  //     }
  // })

  //if a trigger, get triggers for this condition - pull condition id, and type from url
    const headers =  {
            'filter': "",
            'MyCustomHeader2': '2'
        }
        console.log(headers);
    let fetchedConditions = await fetchData(apiURL + '/conditions', headers);
    console.log(fetchedConditions);
    //set beleif list which will be used to create belief cards on next page
   // setConditionListToDisplay(fetchedConditions?.response?.data);
    console.log(fetchedConditions.response.data);
    //navigate('/conditions')
  
  }

  useEffect(() =>{

    console.log(passedInList)
    console.log(cardsToDisplay)

    //or passedInList
    if(passedInList && !cardsToDisplay)
      {
        console.log('wtf no inits?')
        createCards();
      }
    if(!conditionListToDisplayl)
      {
       //getConditions()
      }
    
  
  
    const cleanUp = () => {
        // isMounted = false;
        // controller.abort()
        console.log('cleanup called')
        // source.cancel();
    }
  
    return cleanUp;
  },[]);



async function createCards(){
  console.log(loggedInUser)
   let access = await getAccessInfo(loggedInUser)
   console.log(access)

  // setHasAccess(access)

    console.log('creating cards')
    let conditionComponents =[];
    for (let condition of passedInList )
    //conditionComponents= passedInList.map(async (condition,i) =>
    {
      //dont display intelligence insecurity until its updated
      // if(condition._id!='66def843d50bf12e82770ae3')
      // {
        let parentId;
        console.log(access, condition)

        //if a child condition, then we need to check if we have access to a condition in the parent list
        let showLock = await determineIfLocked(condition,access); //dont show lock for social anxiety
        console.log(showLock, condition)
        console.log(condition?.parentConditions)
        //logged in with access object and condition isn't social anxiety or a child condition of SA
      
        conditionComponents.push( <a id={condition._id} style={{'text-decoration': 'none',  color: 'inherit'}} href={`/condition/${condition._id}`} key={condition._id} onClick={async (e) => {
          console.log(condition._id)
          let usageData = {
            page: location.pathname,
            username: loggedInUser,
            metadata: {
              'card':'condition',
              "objectName":`${condition.condition}`, 
              fileName:  'ConditionsList.js'
              }, 
            action: 'click'
          }
          
        await insertEvent(usageData)
          //fetchCondition(condition._id)
        }}>
            <SingleConditionCard showLock={showLock} condition={condition.condition} preview={condition.preview} ourDefinition={condition.ourDefinition}/>
        </a>)

        //put this as number one
        if(condition._id==='66df6fd0e95bed6217424ab1')
        {
          let temp = conditionComponents[0]
          conditionComponents[0] = conditionComponents[conditionComponents.length-1]
        conditionComponents[conditionComponents.length-1] = temp

        }
        //put this as 2
        if(condition._id==='674c8f3390d9df6b72e685e9')
          {
            conditionComponents = putConditionInPosition("674c8f3390d9df6b72e685e9",1,conditionComponents)
  
          }
          // put this as 3
          if(condition._id==='674c931890d9df6b72e685ea')
            {
              conditionComponents = putConditionInPosition("674c931890d9df6b72e685ea",2,conditionComponents)
    
            }
      
        
    }
  
    

setCardsToDisplay(conditionComponents)

console.log(conditionComponents)

}

function putConditionInPosition(condiitonId,position,conditionComponents)
{
  let temp = conditionComponents[position]
  conditionComponents[position] = conditionComponents[conditionComponents.length-1]
conditionComponents[conditionComponents.length-1] = temp

return conditionComponents;
}



async function determineIfLocked(condition, access){

  let showLock = await determineIfLockedUtil(condition,access)

      return showLock
  
}
  //create card to display 

  
  
  

  
  
  //show list of single card components
  return (
    // <div> 
    // {conditionComponents}
    //     <h2>Can't find your Condition? <Link>Submit your condition for review by our experts.</Link>You'll be notified if the condition gets added to the app.</h2>
    // </div>
<>
{/* {cardsToDisplay ? <Flex wrap="wrap" align="" gap="1" className=""> {cardsToDisplay} 
</Flex>  :   <Progress size="3" duration="1s" />  } */}

{cardsToDisplay ?<div class="fbox-wrapper">
						<div class="row row-cols-1 row-cols-md-3 rows-3">  {cardsToDisplay} </div>
            </div> :   <Progress size="3" duration="1s" />  }


</>
    
  );
}

export default ConditionList;

// <Spinner size="3" duration="1s" />

//if you hit anxiety youre taking to a search page with triggers, fears, 


/*
 if(access && !(condition._id!=='66df6fd0e95bed6217424ab1' ||  !condition?.parentConditions.includes('66df6fd0e95bed6217424ab1')))
      {
        console.log(access)
        let parentAccess = true;
        if(condition?.parentConditions && condition?.parentConditions.length >=1)
        {
          condition?.parentConditions.forEach((parentId,i) => {
            if(!access[parentId])
            {
              parentAccess = false;
            }
                
          })
        }
        console.log(access['subscribed'] || access[condition._id])
         showLock = (access['subscribed'] || access[condition._id] || parentAccess) ? false : true
        //not logged in with access object and condition isn't social anxiety or a child condition of SA
      } else if( !access && !(condition._id!=='66df6fd0e95bed6217424ab1' || !condition?.parentConditions.includes('66df6fd0e95bed6217424ab1')))
      {
        console.log('in here?')
        showLock=true
      }
        */