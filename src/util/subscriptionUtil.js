import { Button, Flex, TextField } from '@radix-ui/themes'

import { postData, apiURL } from '../api/fetchData';
import { insertEvent } from './trackingSiteBehavior';



async function purchaseSubscription(id, loggedInUser) {
  

  //insertEvent('click',{'button':'subscription'})

  let payload =  {
    "id": id,
    "username": loggedInUser,
    'objectType': 'condition'
  }

  insertEvent('click',{'button':'subscription'})

  let {response} = await postData(apiURL + `/payment/createSubscriptionCheckout`,payload);
  console.log(response)
  console.log(response.status)

  if(response && response?.status>=200)
      window.location.href = response?.data?.redirect
 // setConditionsToDisplay(fetchedConditions);

}
  

// insertEvent('click',{'button':'forum',"objectName":`${conditionToDisplay.condition}`}, location.pathname, fileName)

export {purchaseSubscription}