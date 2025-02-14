import { Button, Flex, TextField } from '@radix-ui/themes'

import { postData, apiURL } from '../api/fetchData';




async function insertEvent(payload)
{

  if(process.env.REACT_APP_ENV==='prod')
  {
    // let payload =  {
    //   "username": data.loggedInUser,
    //   'metadata': {...data.metadata, 'fileName':`${data.fileName}`},
    //   "page": data.location,
    //   "action": data.action
    // }
    console.log(payload)
     let {response} = await postData(apiURL + `/events/addEvent`,payload);
     console.log(response)
  
  }

}
  

// insertEvent('click',{'button':'forum',"objectName":`${conditionToDisplay.condition}`}, location.pathname, fileName)

export {insertEvent}