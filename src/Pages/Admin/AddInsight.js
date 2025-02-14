import React from 'react'
import {  } from "./utility";
import DataContext from '../../context/DataContext';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { fetchData, postData, putData, apiURL } from '../../api/fetchData';
import parse from 'html-react-parser';
// import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

// import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../../Components/TextEditor';
import { Button } from '@radix-ui/themes';

import { checkIfAdmin } from './utility';




const AddInsight = () => {

  // const { quill, quillRef } = useQuill({ placeholder: "123" });

  const {insightToDisplay, setInsightToDisplay, loggedInUser } = useContext(DataContext);
  //shoudl be null on each refresh which will force a new pull and get new conditions added
  const [insightTitle, setInsightTitle ] = useState(null);
  const [theInsight, setTheInsight ] = useState(null);

 const [tags, setTags ] = useState(null);
  const [conditions, setConditions ] = useState(null);
  const [author, setAuthor ] = useState(null);
  const [checkedConditions, setCheckedConditions ] = useState(null);
  const [conditionsToDisplay, setConditionsToDisplay ] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkBoxRefs = useRef({});


  
  const { insightId } = useParams();
  const navigate = useNavigate();



  const handleCheckboxChange = async (checkbox)=> {
    //when checked, add to map, when unchcied, can remove or set to unchecked
    console.log(checkbox)
    const { id, checked, defaultValue } = checkbox.target;
    setCheckedConditions(prevValues => ({
      ...prevValues,
      [id]: checked
    }));
  }

  const getConditions = async (setConditionsToDisplay, callBack)=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    let fetchedConditions = await fetchData(apiURL + '/conditions');
    console.log(fetchedConditions)
    fetchedConditions = fetchedConditions?.response?.data;
   // setConditionsToDisplay(fetchedConditions);

    let conditionCheckboxes  = fetchedConditions.map((condition) => {
      console.log(condition);
     return <div>
        <input type="checkbox" ref={(node)=> {checkBoxRefs.current = {...checkBoxRefs.current, [condition._id]: node} }}id={condition._id} name="condition" value={condition._id}  onChange={handleCheckboxChange} />
        <label for="coding">{condition.condition}</label>
      </div>
      // return <option value={condition._id}>{condition.condition}</option>
    });
    console.log(checkBoxRefs)
    console.log(conditionCheckboxes)


    setConditionsToDisplay(conditionCheckboxes);
    //create map of nodes for each input then iterate over conditions from insight and if a match node exists, set check to true then update the cehcked condition object

   // setInsightList(fetchedInsights);
}



  const getInsight = async ()=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    console.log(apiURL)
    let fetchedInsight = await fetchData(apiURL + `/insights/${insightId}`);
    if(fetchedInsight)
    {
      fetchedInsight = fetchedInsight?.response?.data;
      console.log(fetchedInsight)
      setInsightTitle(fetchedInsight.insightTitle);
      setTheInsight(fetchedInsight.insight)
      setAuthor(fetchedInsight.author);
      setTags(fetchedInsight.tags)

      if(fetchedInsight?.conditions)
      {
        fetchedInsight?.conditions.forEach((conditionId) => {
          console.log('does the ref empty after updating state', checkBoxRefs)
          console.log( checkBoxRefs.current[conditionId]?.checked, conditionId)
          console.log( checkBoxRefs.current[conditionId]?.checked, conditionId)

          if(checkBoxRefs.current[conditionId])
          checkBoxRefs.current[conditionId].checked=true;
            setCheckedConditions(prevValues => ({
              ...prevValues,
              [conditionId]: true
            }));
        })
      } 
     

      
    }
  
   // divRef.current.innerHTML = fetchedInsight.insight;
}
  


useEffect(() =>{

  checkIfAdmin(setIsAdmin);     


  async function driver(){
    if(!conditionsToDisplay) //tags havent been retrieved for this session (not in localstorage or current state)
    await getConditions(setConditionsToDisplay);
  
    if(insightId)
    {
     
     await getInsight()
  
    }
     
  }

  driver()
  

  const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }

  return cleanUp;
},[conditionsToDisplay]); //not sure fi this is actually needed


async function handleSubmit(e) {
  //e.preventDefault();

  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  console.log(checkedConditions)
  let checkedConditionsToSubmit;
  if(checkedConditions)
   checkedConditionsToSubmit = Object.keys(checkedConditions).filter(key => checkedConditions[key]);
  console.log(checkedConditionsToSubmit)
  const insightToAdd = {
    "insightTitle": insightTitle,
    "insight": theInsight,//will be html string 
    "tags": tags,  
    "conditions": checkedConditionsToSubmit,  
    "author": loggedInUser
};

if(!insightId) 
  {
  
    let addInsightResponse = await postData(apiURL + `/insights/`, insightToAdd);
    console.log(addInsightResponse)
    navigate('/insights')
    
   
  } else{
    console.log(insightToAdd)
   let put =  await putData(apiURL + `/insights/${insightId}`, insightToAdd)
   console.log(put)
   navigate(`/insights/${insightId}`)
  }

}

  



  return (

    isAdmin && <div>
      {/* <form  onSubmit={handleSubmit}> */}
      <label>
          Insight Title:
          <input
            type="text"
            name="insightTitle"
            value={insightTitle}
             onChange={(e) => setInsightTitle(e.target.value)}
          />
        </label>
        <h2>The insight</h2>
        <TextEditor initText={theInsight} childToSet={setTheInsight}></TextEditor>
      <fieldset>
      <legend>Conditions this insight applies to:</legend>
      {conditionsToDisplay}
      <label>
          Tags, comma seaparated:
          <input
            type="text"
            name="tags"
            value={tags}
             onChange={(e) => setTags(e.target.value.split(','))}
          />
        </label>
        <label>
          Author
          <input
            type="text"
            name="author"
            value={author}
             onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
    </fieldset>
    {/* </form> */}
   
      

    {insightId ? <Button onClick={handleSubmit}>Edit</Button > : <Button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create  Insight</Button>}
    </div>
   
    
    // {/* // input text for dismantling of the belief- allows html
    // //future feature will check beleif for loaded words automaticcaly. take text and see if includes anything from loaded word DB
    // //root cause for selector of conditions. selector is the ext, when we pull conditions we will be able to create object that lets us map condition tet to id */} 
  )
}

export default AddInsight

// get all checked boxes(the condition id and use that to send a list to api)