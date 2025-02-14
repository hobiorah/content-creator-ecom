import React from 'react'
import DataContext from '../../context/DataContext';
import { Link, useParams } from "react-router-dom";

import { fetchData, postData, apiURL} from '../../api/fetchData';
import parse from 'html-react-parser';



//create condition checkboxes
  const getConditions = async (setConditionsToDisplay, callBack, checkBoxRefs)=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    let fetchedConditions = await fetchData(apiURL + '/conditions');
    console.log(fetchedConditions)
    fetchedConditions = fetchedConditions?.response?.data;
   // setConditionsToDisplay(fetchedConditions);

    let conditionCheckboxes  = fetchedConditions.map((condition) => {
      console.log(condition);
     return <div>
        <input type="checkbox" id={condition._id} name="condition" value={condition._id}  onChange={callBack} ref={(node) => {
           console.log(checkBoxRefs)
          if(checkBoxRefs)
            checkBoxRefs.current = {...checkBoxRefs.current, [condition._id]: node }
            // console.log(checkBoxRefs.current)
            // console.log(checkBoxRefs)
        }}/>
        <label for="coding">{condition.condition}</label>
      </div>
      // return <option value={condition._id}>{condition.condition}</option>
    });
    console.log(conditionCheckboxes)
    console.log('check box refs')
    console.log(checkBoxRefs)

    setConditionsToDisplay(conditionCheckboxes);
    return checkBoxRefs;
    //create map of nodes for each input then iterate over conditions from insight and if a match node exists, set check to true then update the cehcked condition object

   // setInsightList(fetchedInsights);
}



async function checkIfAdmin(set){
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  let adminIn = await fetchData( apiURL + `/auth/checkLoggedIn/`);
  console.log(adminIn)
  adminIn = adminIn?.response?.data;
  console.log(adminIn)
  if(adminIn)
    set(adminIn.isLoggedIn && adminIn.isAdmin )

}
  


  
  export { getConditions, checkIfAdmin };
