import React from 'react'
import DataContext from '../context/DataContext';
import { hasAccessToObject, getAccessInfo, getUserDetails } from '../api/userManagement';
import { Flex, Button, AlertDialog, Text, Heading, Em, Table, Link as test} from '@radix-ui/themes';
import { useState, useEffect, useContext } from "react";
import { postData, apiURL } from '../api/fetchData';




const AccountDetails = () => {

  const { loggedInUser,searchedForBelief, setsearchedForBelief, beliefListToDisplay, setBeliefListToDisplay, displayName } = useContext(DataContext);
  const [userDetails, setUserDetails] = useState(null);
  const [purchaseItemsToDisplay, setPurchaseItemsToDisplay] = useState(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [subscriptionPortal, setSubscriptionPortal] = useState('');




  



    //purchase history

    //get user account then iterate thorugh pruchase hsotry keys, get last eleementin array and build a card

    async function createAccountDetailComponent(){
      let resp = await getUserDetails(loggedInUser)
      console.log(resp)

      if(resp!=null && resp.purchaseInfo )
      {
        let purchaseItems =[];

        for (const [key, purchaseRecordings] of Object.entries(resp.purchaseInfo)) 
         {
            console.log(`${key}: ${purchaseRecordings}`);
            if(key!=='subscription')
            {
              let latestPurchaseEntry = purchaseRecordings[purchaseRecordings.length-1]
              console.log()

              //https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
              let timeToDisplay = new Date(latestPurchaseEntry.transactionTime)
              console.log(timeToDisplay.toLocaleString())
            let usaTime = timeToDisplay.toLocaleString("en-US", {timeZone: "America/New_York"});
              console.log(usaTime)



              purchaseItems.push(
              <Table.Row>
                  <Table.RowHeaderCell>{latestPurchaseEntry.conditionName}</Table.RowHeaderCell>
                <Table.Cell><a href={latestPurchaseEntry.receipt}>Click to see</a> 
                </Table.Cell>
                {/* also can use today.toUTCString(); // "Sat, 13 Jun 2020 18:30:00 GMT" */}
                <Table.Cell>{timeToDisplay.toLocaleString()}</Table.Cell> 
              </Table.Row>
              )
            }else if(key==='subscription' && resp.accessInfo['subscribed'])
             {
             
              let latestPurchaseEntry = purchaseRecordings[purchaseRecordings.length-1]
              setSubscriptionInfo(latestPurchaseEntry)
              //setSubscriptionPortal(latestPurchaseEntry.checkoutSession.)

             }
  
        }
        setPurchaseItemsToDisplay(purchaseItems)
        
      }
     

      

      setUserDetails(resp)

    }

    async function manageSubscription(){

      let base = process.env.REACT_APP_ENV==='dev' ? process.env.REACT_APP_CLIENT_SERVER + process.env.REACT_APP_CLIENT_PORT : process.env.REACT_APP_PROD_CLIENT_SERVER

      let payload =  {
        "session_id": subscriptionInfo.checkoutSession.id,
        "returnUrl": base + `/accountDetails`,
      }
      let {response} = await postData(apiURL + `/payment/createSubscriptionPortal`,payload);
      console.log(response)
      console.log(response.status)
    
      if(response && response?.status>=200)
          window.location.href = response?.data?.redirect
     // setConditionsToDisplay(fetchedConditions);

    }


    useEffect(() =>{

      async function init() {
        if(!userDetails) //tags havent been retrieved for this session (not in localstorage or current state)
        {
          console.log('is this being called')
      
          await createAccountDetailComponent();
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
      },[loggedInUser]); //not sure fi this is actually needed
  return (
    <>    

      {loggedInUser && <Heading>Username/email</Heading>}
      {loggedInUser && <Text>{loggedInUser}</Text>}

      {loggedInUser && <Heading mt='3'>Your display name others will see</Heading>}
      {loggedInUser && <>
      <Text mb=''>{displayName}</Text>
      <Text color='red' highContrast size="1"> Note: Only your display name is used when you post or reply to content. Not your email</Text>
      </>}


    <Heading mt='3'>Individual lifetime purchases</Heading> 
    <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Purchased Object</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Receipt Link</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Time of recorded purchase</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  
    <Table.Body>
    {purchaseItemsToDisplay}

      {/* <Table.Row>
        <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
        <Table.Cell>danilo@example.com</Table.Cell>
        <Table.Cell>Developer</Table.Cell>
      </Table.Row>
  
      <Table.Row>
        <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
        <Table.Cell>zahra@example.com</Table.Cell>
        <Table.Cell>Admin</Table.Cell>
      </Table.Row>
  
      <Table.Row>
        <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
        <Table.Cell>jasper@example.com</Table.Cell>
        <Table.Cell>Developer</Table.Cell>
      </Table.Row> */}
    </Table.Body>
  </Table.Root>
  { <Heading mt='3'>Subscriptions</Heading>}
 {subscriptionInfo && <Button mt='2' onClick={manageSubscription}>Manage subscriptions</Button>}
 {!subscriptionInfo && <Text mt='2'> If you had a subscription before and its no longer here then you likely canceled it. To get a new subscription, click on a product you don't already have and repurchase a new subscription. If you have any questions reach out to us at {process.env.REACT_APP_CLARITY_EMAIL} </Text>}
  </>
  )
}

export default AccountDetails

