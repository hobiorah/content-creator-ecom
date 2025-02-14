import React from 'react'
import DataContext from '../../context/DataContext';
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchData, postData, putData, apiURL } from '../../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../../Components/TextEditor';
import { Button, Heading, Select, Text, TextField } from '@radix-ui/themes';

import { checkIfAdmin, getConditions } from './utility';


const AddCondition = () => {
  // const {insightToDisplay, setInsightToDisplay } = useContext(DataContext);
  //shoudl be null on each refresh which will force a new pull and get new conditions added
  const [condition, setCondition ] = useState(null);
  const [conditionObject, setConditionObject ] = useState(null);
  const [ourDefinition, setOurDefinition ] = useState(null);
  const [checkedConditions, setCheckedConditions ] = useState(null);


 const [thirdPartyDefinition, setThirdPartyDefinition ] = useState(null);
  const [sourceName, setSourceName ] = useState(null);
  const [sourceLink, setSourceLink ] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [conditionType, setConditionType] = useState("");
  const [conditionsToDisplay, setConditionsToDisplay] = useState(null);
  const [preview, setPreview] = useState(null);


  const checkBoxRefs = useRef({});

  const navigate = useNavigate();

  const { id } = useParams();

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

  const getCondition = async ()=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    let fetchedCondition = await fetchData(apiURL + `/conditions/${id}`);
    if(fetchedCondition){
      console.log(fetchedCondition)
     fetchedCondition = fetchedCondition?.response?.data;
  
      console.log(fetchedCondition)
      setConditionObject(fetchedCondition)
      setCondition(fetchedCondition.condition)
      setOurDefinition(fetchedCondition.ourDefinition)
      setConditionType(fetchedCondition.type)
      setPreview(fetchedCondition.preview)

      fetchedCondition?.parentConditions && fetchedCondition.parentConditions.forEach((conditionId) => {
        console.log(conditionId)
        console.log(checkBoxRefs.current)
        //checkBoxRefs.current = {...checkBoxRefs.current, [condition._id]: node }
        if(checkBoxRefs.current[conditionId])
        {
          console.log(checkBoxRefs.current[conditionId].checked)
          checkBoxRefs.current[conditionId].checked=true;
          setCheckedConditions(prevValues => { return { ...prevValues, [conditionId]: true}});   
        }
      
      })
        console.log(checkBoxRefs.current)
        console.log(checkBoxRefs)
    }
    

}






useEffect(() =>{

  async function init(){
    await checkIfAdmin(setIsAdmin);
   
    if(!conditionsToDisplay)
        await getConditions(setConditionsToDisplay, handleCheckboxChange, checkBoxRefs); //to display     
    
    console.log('in it with')
    console.log(checkBoxRefs)
    
    if (id && !conditionObject ) {
      console.log(checkBoxRefs)
      await getCondition();  
    }
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




//
  

async function handleSubmit(e) {
  //e.preventDefault();

  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

   // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
   console.log(checkedConditions)
   let checkedConditionsToSubmit;
   if(checkedConditions)
    checkedConditionsToSubmit = Object.keys(checkedConditions).filter(key => checkedConditions[key]);
   
  let conditionToAdd = {
    "condition": condition,
   "ourDefinition": ourDefinition,
   
   "parentConditions": checkedConditionsToSubmit,
   "preview": preview, 
 
   "thirdPartyDefinition": 
   {
       "definition": thirdPartyDefinition,
       "sourceName": sourceName,
       "sourceLink": sourceLink
    }
   };

   if(conditionType!=='')
    conditionToAdd = {...conditionToAdd, "type": conditionType}

   console.log(conditionToAdd)

  if(!id) //a create
    {
    
      let addConditionResponse = await postData(apiURL + `/conditions/`, conditionToAdd);
      console.log(addConditionResponse)
      navigate('/conditions')
     
    } else{ //an eddit
      console.log(conditionToAdd)
     let put =  await putData(apiURL + `/conditions/${id}`, conditionToAdd)
     console.log(put)
     navigate(`/condition/${id}`)
    }

}



  return (
    isAdmin &&
    <div>
      <label>
          Condition Name:
          <TextField.Root value={condition} placeholder="" size="3"  onChange={(e) => setCondition( e.target.value)}>
      </TextField.Root>

          {/* <input
            type="text"
            name="condition"
            value={condition}
             onChange={(e) => setCondition( e.target.value)}
          /> */}
        </label>
        
        <h2>Our definition</h2>
        <TextEditor initText={ourDefinition} childToSet={setOurDefinition}></TextEditor>
        <br></br>
        <Heading>Preview:</Heading>
        <TextEditor initText={preview} childToSet={setPreview}></TextEditor>

        <legend>What conditions is this a subcondition  for:</legend>
        {conditionsToDisplay}

        <Text>Condition type</Text>
        <Select.Root value={conditionType} onValueChange={(retrivedValue)=> setConditionType(retrivedValue) } size="2" defaultValue="">
          <Select.Trigger  />
          <Select.Content>
            <Select.Item  value="trigger">Trigger</Select.Item>
            <Select.Item value="fear">Fear</Select.Item>
          </Select.Content>
  </Select.Root>
        {/* <h2>Third Party info</h2>

        <label>
          Definition:
        </label>
        <TextEditor childToSet={setThirdPartyDefinition}></TextEditor>
        <label>
          Source Name:
          <input
            type="text"
            name="sourceName"
             onChange={(e) => setSourceName(e.target.value)}
          />
        </label>
        <label>
          Source link:
          <input
            type="text"
            name="sourcLink"
             onChange={(e) => setSourceLink(e.target.value)}
          />
        </label> */}

        {/* <button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create Condition</button> */}

        {id ? <Button onClick={handleSubmit}>Edit</Button > : <Button style={{ marginTop: '10px'}} onClick={handleSubmit}>Create Condition</Button>}



    </div>
    
  )
}

export default AddCondition




 




  

  //console.log(e)
 








  