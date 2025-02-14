import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import SingleBeliefCard from "./SingleBeliefCard";
import { fetchData } from './api/fetchData';
import { insertEvent } from "./util/trackingSiteBehavior";
import { Flex } from "@radix-ui/themes";




function BeliefList({passedInBeliefList}) {
  const { searchedForBelief, setsearchedForBelief, beliefList, beliefListToDisplay, setBeliefToDisplay, setBeliefListToDisplay, loggedInUser } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();


  // if(!beliefListToDisplay && passedInBeliefList)
  if(passedInBeliefList)
    setBeliefListToDisplay(passedInBeliefList)


  let products = ['a','v'];

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

  const createConditionsString = (conditions) =>{

    let test ='';
    conditions.forEach((conditionObject,i) =>
        {
          test += conditionObject.condition;
          if (i +1 !== conditions.length) test += ', ';
      })
      console.log('condition string')
      console.log(test);
      return test
   };

  const fetchBelief = async (idToSearchFor) => {
    console.log(`id we lliking for ${idToSearchFor}`)
    const headers =  {
        'id': idToSearchFor 
    }
    console.log(headers);


    console.log(`wtf is headers nt working ${headers}`)
    let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    
    let fetchedBelief = await fetchData(apiURL +`/beliefs/${idToSearchFor}`);
    console.log(`fetched belief for 1 pager is ${fetchedBelief.response}`);
    console.log(fetchedBelief.response.data);

    setBeliefToDisplay(fetchedBelief.response.data)
    navigate(`/belief/${idToSearchFor}`)

}

//DO CHECK IF BELIEF EXISTS. IF NOT TELL USER
  //filter beliefs based on search
  let beliefComponents = null;
  if(beliefListToDisplay)
  {
     beliefComponents = beliefListToDisplay.map((belief,i) =>
      {
        console.log('not building belieflist?')
       
         let conditionsString= belief.conditions ? createConditionsString(belief.conditions): ''
         belief.conditionsString= conditionsString
    
        
          {/* when click button send you to individual belief page */}
          let card = 
           <a  key={belief._id} onClick={async (e) => { 
            let usageData = {
              page: location.pathname,
              username: loggedInUser,
              metadata: {
                'card':'belief',
                "objectName":`${belief.belief}`, 
                 fileName:  'BeliefList.js'
                 }, 
              action: 'click'
            }
            
           await insertEvent(usageData)
               setBeliefToDisplay(belief);
                navigate(`/belief/${belief._id}`);
                // fetchBelief(belief._id)
                }}>
                   {/* could let the component pull from state instead of passing props */}
              <SingleBeliefCard  dismantling={belief.dismantlingOfBelief} conditionsString={conditionsString} conditions={belief.conditions} belief={belief.belief} metaProblems={belief.metaProblems}/>
           </a>
           return card;
      }
      );
      console.log(beliefComponents)
  }
  
  
  
  //show list of single card components
  return (
 
  //   <div className="beliefList"> 
  //    {beliefComponents}
  // </div>
   
    //display if more than one element
 <>
 {/* if list to display state is set and it has something  */}
 {(beliefListToDisplay &&  beliefListToDisplay.length>0) && <><Flex  wrap="wrap" gap='2'>{beliefComponents}</Flex></>}
   {/* {(beliefListToDisplay &&  beliefListToDisplay.length>0) ?
    <>  {beliefComponents}</> : <p>No beliefs to show. If you think this is wrong please reach out to us</p>
    } */}
    </>
   
  );
}


export default BeliefList;


// const beliefComponents = beliefList.map((belief,i) =>
//   <li  key={belief._id}>
//     {/* when click button send you to individual belief page */}
//     <button style={butt} onClick={(e) => {
//       fetchBelief(belief._id)
//     }}>
//         <SingleBeliefCard belief={belief.belief} metaProblems={belief.metaProblems}/>
//     </button>
//     {/* <Link to={`/belief/${belief._id}`}>
//       <SingleBeliefCard belief={belief.belief} metaProblems={belief.metaProblems}/>
//     </Link>          
//     */}
//   </li>
// );