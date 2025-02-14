import React from 'react'
import DataContext from '../../context/DataContext';

import { fetchData, postData, putData, apiURL} from '../../api/fetchData';
import parse from 'html-react-parser';
// import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

// import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../../Components/TextEditor';
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Button } from '@radix-ui/themes';


import { checkIfAdmin } from './utility';
// let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;


       

const AddBelief = () => {
  // const { quill, quillRef } = useQuill({ placeholder: "123" });
  const navigate = useNavigate();
  const {insightToDisplay, setInsightToDisplay, setBeliefToDisplay, loggedInUser } = useContext(DataContext);
  //shoudl be null on each refresh which will force a new pull and get new conditions added
  const [conditionsToDisplay, setConditionsToDisplay ] = useState(null);
  const [checkedConditions, setCheckedConditions ] = useState(null);

 const [beliefTitle, setBeliefTitle ] = useState(null);
 const [beliefToEdit, setBeliefToEdit ] = useState(null);
  const [dismantlingOfBelief, setDismantlingOfBelief ] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);



  const { insightId } = useParams();
  const { beliefId } = useParams();
  //create refs to the elements when building the elements. key:condition id" value: the ref/node
  //loop through conditions array of ebleif and check map for id, pull out if exist and set to checked
  const checkBoxRefs = useRef({});





  const handleCheckboxChange = async (checkbox)=> {
    //when checked, add to map, when unchcied, can remove or set to unchecked
    console.log(checkbox)
    const { id, checked, defaultValue } = checkbox.target;
    setCheckedConditions(prevValues => { return { ...prevValues, [id]: checked}});

// ({
//   ...prevValues,
//   [id]: checked
// }));
  }


  //creates condition checkboxes
  const getConditions = async ()=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    let fetchedConditions = await fetchData(apiURL + '/conditions');
    console.log(fetchedConditions)
    fetchedConditions = fetchedConditions?.response?.data;
   // setConditionsToDisplay(fetchedConditions);

   //create array of conditioncheckboxes. when checked, we add the checkbox to a map 
    let conditionCheckboxes  = fetchedConditions.map((condition) => {
      console.log(condition);
     return <div>
        <input type="checkbox" id={condition._id} name="condition" value={condition._id} onChange={handleCheckboxChange} ref={(node) => {
          checkBoxRefs.current = {...checkBoxRefs.current, [condition._id]: node }
          console.log(checkBoxRefs.current)
          console.log(checkBoxRefs)
        }}/>
        <label for="coding">{condition.condition}</label>
      </div>
      // return <option value={condition._id}>{condition.condition}</option>
    });
    console.log(conditionCheckboxes)

    setConditionsToDisplay(conditionCheckboxes);
   // setInsightList(fetchedInsights);
}


const fetchBeliefToEdit = async () => {
 
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

  let fetchedBelief = await fetchData( apiURL + `/beliefs/${beliefId}`);
  console.log(`fetched belief for 1 pager is ${fetchedBelief.response}`);
  console.log(fetchedBelief.response.data);
  fetchedBelief = fetchedBelief.response.data
 // setBeliefToDisplay(fetchedBelief)

  //going to this page means we fetch a belief that wont have conditions field of objects set 

    console.log('get conditions')
    console.log(fetchedBelief.rootCauseFor)
   
   // fetchedBelief = await createConditionObjects(fetchedBelief) 
   // buildConditionLinks(fetchedBelief)
 
  
  console.log('does this not finish first????')
    setBeliefToEdit(fetchedBelief)
    setBeliefTitle(fetchedBelief.belief);
    setDismantlingOfBelief(fetchedBelief.dismantlingOfBelief);
    return fetchedBelief;
}



useEffect(() =>{



const driver = async () => {

  checkIfAdmin(setIsAdmin);     


  if(!conditionsToDisplay) //tags havent been retrieved for this session (not in localstorage or current state)
  await getConditions();

  console.log(checkBoxRefs.current)
  
  if(beliefId) //if theres a belief Id to pull then we know its an edit
  {
    let fetchedBeliefToEdit = await fetchBeliefToEdit();
     //create refs to the elements when building the elements. key:condition id" value: the ref/node
  //loop through conditions array of ebleif and check map for id, pull out if exist and set to checked
    console.log(fetchedBeliefToEdit);
    setBeliefTitle(fetchedBeliefToEdit.belief);
    setBeliefToEdit(fetchedBeliefToEdit)
   // console.log(beliefToEdit.belief); //even though we set beleif to edit its not accessible until we exit this use effect execution  


   //update checkboxes to be checked if belief is a root cause for and update checkeconditions DS which holds checked boxes to submit
   fetchedBeliefToEdit?.rootCauseFor && fetchedBeliefToEdit.rootCauseFor.forEach((conditionId) => {
    console.log(conditionId)
    console.log(checkBoxRefs.current)
    //checkBoxRefs.current = {...checkBoxRefs.current, [condition._id]: node }
    if(checkBoxRefs.current[conditionId])
    {
      console.log(checkBoxRefs.current[conditionId]?.checked)
      checkBoxRefs.current[conditionId].checked=true;
      setCheckedConditions(prevValues => { return { ...prevValues, [conditionId]: true}});   
     }
  })
  
    console.log(checkBoxRefs.current)
    console.log(checkBoxRefs)
  }
}

  
driver();

 


  const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }

  return cleanUp;
},[]); //not sure fi this is actually needed


async function handleSubmit(e) {
  //e.preventDefault();
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  let checkedConditionsToSubmit
  if(checkedConditions)
     checkedConditionsToSubmit = Object.keys(checkedConditions).filter(key => checkedConditions[key]);
  console.log(checkedConditionsToSubmit)
     const beliefToAdd = {
      "belief": beliefTitle,
      "dismantlingOfBelief": dismantlingOfBelief,
      "rootCauseFor": checkedConditionsToSubmit,
      "rootCauseOf": checkedConditionsToSubmit
   };
//    if(!beliefId)
//       let addBeliefResponse = await postData(apiURL + `/beliefs/`, beliefToAdd);
// }
   if(!beliefId) 
    {
    
      await postData(apiURL + `/beliefs/`, beliefToAdd)
      setBeliefToDisplay(null)
      setBeliefToEdit(null)
      navigate('/beliefSearch')
     
    } else{
      console.log(beliefToAdd)
     let put =  await putData(apiURL + `/beliefs/${beliefId}`, beliefToAdd)
     console.log(put)
      setBeliefToDisplay(null)
      setBeliefToEdit(null)
      navigate(`/belief/${beliefId}`)

    }
  }


async function editBelief(e) {

}


  return (
  isAdmin &&    
    <div>
      {/* <form  onSubmit={handleSubmit}> */}
      <label>
          Belief Title:
          <input
            type="text"
            name="beliefTitle"
            value={beliefTitle}
             onChange={(e) => setBeliefTitle(e.target.value)}
          />
        </label>
      <fieldset>
      <legend>What conditions is this a root cause for:</legend>
      {conditionsToDisplay}
      {/* <div>
        <input type="checkbox" id="music" name="interest" value="music" />
        <label for="music">Music</label>
      </div> */}
    </fieldset>
    {/* </form> */}
   
        <TextEditor initText={dismantlingOfBelief} beliefId={beliefId} onSubmit={handleSubmit} childToSet={setDismantlingOfBelief}></TextEditor>
       
      {beliefId ? <Button onClick={handleSubmit}>Edit</Button > : <button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create belief</button>}
    </div>
   
    
    // {/* // input text for dismantling of the belief- allows html
    // //future feature will check beleif for loaded words automaticcaly. take text and see if includes anything from loaded word DB
    // //root cause for selector of conditions. selector is the ext, when we pull conditions we will be able to create object that lets us map condition tet to id */} 
  )
}

export default AddBelief

// get all checked boxes(the condition id and use that to send a list to api)