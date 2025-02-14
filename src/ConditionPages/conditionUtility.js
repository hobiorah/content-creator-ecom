import { Button, Flex, TextField } from '@radix-ui/themes'
import React from 'react'
import parse from 'html-react-parser';
import { fetchData, apiURL } from '../api/fetchData';


console.log(process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api')


// REACT_APP_API_SERVER=http://localhost:
// API_SERVER=http://localhost:

//child object will send in parent; in future might support purchasing child objects
async function determineIfLockedUtil(condition, access){

    //show lock when not logged in and not free to all; logged in but not available to free account
  
    let globalConditionAccess = await fetchData(apiURL + `/user/access/condition`);
    let showLock = false;

    console.log(globalConditionAccess)
    let userGlobalConditionAccess = globalConditionAccess?.response?.data?.accesses.user
    console.log(globalConditionAccess)
   let nonUserGlobalConditionAccess = globalConditionAccess?.response?.data?.accesses.nonUser
  
    // console.log(globalConditionAccess?.response?.data?.accesses)
    // console.log(globalConditionAccess?.response?.data?.type)
  
    let accessRequired;
    accessRequired = "Requires a subscription"
    //not logged in but condition not free to all
    if(!access && !nonUserGlobalConditionAccess.includes(condition._id) )
    {
      //if were dealing with a sub condition have to check that parents arent in free for allg roup
      if(condition?.parentConditions && condition?.parentConditions.length >=1) 
      {
        //if no parent is in free for all
        if( !condition?.parentConditions.some(parentCondition => nonUserGlobalConditionAccess.includes(parentCondition)))
        {
          showLock=true;

        } 
      } else {
        //if parent is in free for all then we wont show low
        showLock=true;

      }

        
      
    } 
        //logged in and not a condition availbale for free accounts
    else if(access && !userGlobalConditionAccess.includes(condition._id) )
      {
        console.log(access)
        let parentAccess = false;
        if(condition?.parentConditions && condition?.parentConditions.length >=1)
        {
          //check if we have access to any parent conditions via purchase
          condition?.parentConditions.forEach((parentId,i) => {
            if(access[parentId])
            {
              parentAccess = true;
            }
                
          })
          //are any of these parent condition in global list. check if global list contains a parent condition
         console.log('run the test'+ condition?.parentConditions.every(parentCondition => userGlobalConditionAccess.includes(parentCondition)))
         
          console.log('parent access' + parentAccess + condition?.parentConditions.includes(userGlobalConditionAccess))
          //check if anyparent conditions of the condition we're on is in global user access
          if(!parentAccess && condition?.parentConditions.some(parentCondition => userGlobalConditionAccess.includes(parentCondition)) )
            parentAccess=true;
        }
        //if no access then show lock should be true
         showLock = (access['subscribed'] || access[condition._id] || parentAccess ) ? false : true
        //  if(showLock)
        //    accessRequired = "Requires a subscription"
         console.log('show lock when no parent conditions ' + showLock)

        //not logged in with access object and condition isn't in free account goup amd has no parent conditins which mean 
      } else if( !access && !nonUserGlobalConditionAccess.includes(condition._id) && !condition?.parentConditions  )
      {
        //if user not logged in, see if theyd have access if they werelogged in
                  
        showLock=true
        }
        //not logged in, not a parent condition of something in free account group but a child condition
       else if( !access && !nonUserGlobalConditionAccess.includes(condition._id) && condition?.parentConditions  )
        {
          //if has a parent condition and parent not in  free account group. if iterate through all parent conditionsn and find global list never contained any, show lock
          if (condition?.parentConditions.length >=1 && !condition?.parentConditions.some(parentCondition => nonUserGlobalConditionAccess.includes(parentCondition)))
          {console.log('non user global?', nonUserGlobalConditionAccess)
            showLock=true
          }
         
        }

        // if(!access && userGlobalConditionAccess.includes(condition._id))
        //  { accessRequired = "Requires a Free Account"
        //   showLock=true
        //  }

        if (showLock){
           // this or a parent condition is in the free for users group
          if(userGlobalConditionAccess.includes(condition._id) || (condition?.parentConditions && condition?.parentConditions.some(parentCondition => userGlobalConditionAccess.includes(parentCondition))) )
            accessRequired = "Requires a Free Account"
        }

       
  
         showLock = {'boolean':showLock, 'accessRequired':accessRequired};
        return showLock
    
  }
  


// if
export {determineIfLockedUtil}