
import { Button, Flex, TextField } from '@radix-ui/themes'
import React from 'react'
import { fetchData, postData, putData, apiURL} from './fetchData';
import parse from 'html-react-parser';


console.log(process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api')

const getConditionsbyType = async (conditionId, type)=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    let fetchedConditions = await fetchData(apiURL + `/conditions/${conditionId}/${type}`);
    console.log(fetchedConditions)
    fetchedConditions = fetchedConditions?.response?.data;
  
    return fetchedConditions

}


export {getConditionsbyType}