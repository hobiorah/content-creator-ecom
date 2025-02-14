import { Button, Flex, TextField } from '@radix-ui/themes'
import React from 'react'
import { fetchData, postData, putData, apiURL} from './fetchData';
import parse from 'html-react-parser';


console.log(process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api')


// REACT_APP_API_SERVER=http://localhost:
// API_SERVER=http://localhost:

//child object will send in parent; in future might support purchasing child objects
async function hasAccessToObject(objectId,accessObject)
{

  console.log(accessObject)

  if(!accessObject) return false;
    console.log(accessObject[objectId])


  return accessObject['subscribed'] || (accessObject[objectId] && accessObject[objectId])


}
async function getAccessInfo(username)
{

  let userDetails = await fetchData( apiURL + `/user/${username}`);
  console.log(username, userDetails)

  let access = userDetails?.response?.data?.accessInfo
  console.log('the access info variable of access', access)



  if(!access) return null;

  return access;
  


}

async function getUserDetails(username)
{

  let userDetails = await fetchData( apiURL + `/user/${username}`);
  console.log(userDetails?.response?.data)


  if(!userDetails?.response?.data)
     return null;

  return userDetails?.response?.data;
  


}
async function isLoggedIn(e) {

  
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

      
   
        let checkLogin = await fetchData( apiURL + `/auth/checkLoggedIn/`);
        console.log(checkLogin)

        return checkLogin;
        // {
        //     "isLoggedIn": true,
        //     "isAdmin": false
        //   }
 
  }

  async function logOut() {

  
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
   
        let logout = await fetchData( apiURL + `/logout/`);
        console.log(logout)

        return logout;
 
  }

  async function logIn(e) {
//     console.log(user)
//     console.log(pwd)
// //     //e.preventDefault();
  
//     let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
// //     const { user, pwd } = req.body;

//     const loginDetails = {
//       "user": user,
//       "pwd": pwd,  
      
//   };         
      
//         let loginResponse = await postData(apiURL + `/auth/`, loginDetails);
//         console.log(loginResponse)
//         // let adminIN = await fetchData( apiURL + `/auth/checkLoggedIn/`);
//         // console.log(adminIN)


  
  }


export {isLoggedIn, logIn, logOut, hasAccessToObject, getAccessInfo, getUserDetails}