import { Button, Callout, Flex, Heading, Text, TextField, Switch } from '@radix-ui/themes'
import React from 'react'
import { fetchData, postData, putData,apiURL } from '../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import SignupInfo from '../Components/SignupInfo';

const CreateAccount = () => {

  const { search, setSearch, isUserLoggedIn,setIsUserLoggedIn } = useContext(DataContext);
   let navigate = useNavigate();

    const [user, setUser ] = useState(null);
    const [pwd, setPwd ] = useState(null);
    const [createError, setCreateError] = useState(false)
    const [email, setEmail ] = useState(null);
    const [displayName, setDisplayName ] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    const [showSignupInfo, setShowSignupInfo] = useState(false);



    function displaySignupInfo(e)
    {
      console.log(e)
      setShowSignupInfo(e)

    }




    async function createAccount(e) {
    //     console.log(user)
    //     console.log(pwd)
        e.preventDefault();
      
    //     let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    // //     const { user, pwd } = req.body;

        const accountDetails = {
          "user": user,
          "pwd": pwd, 
          "email": email, 
          "displayName": displayName
          
      };         
          
            let createResponse = await postData(apiURL + `/register/user`, accountDetails);
            console.log(createResponse)
            if(createResponse?.response?.status >=200)
            {
              navigate('/login')
            }
            else {
                setCreateError(true)
                console.log(createResponse?.response?.response?.status)
                if(createResponse?.response?.response?.status ===409)
                    setErrorMessage("username already exists")


              }
               
              
            //let adminIN = await fetchData( apiURL + `/auth/checkAdminLoggedIn/`);
            // console.log(adminIN)


      
      }

// make login api request which should put cookine in broswer. in pages whre cookies is needd, can do isloggedin and browser should send cookie 
  return (
<div class='container'>
    <Heading>Create a Free Account</Heading>
    <p>Note: We will only send you communications that either notify you of content on Clarity or provide you opportunities to give us feedback. </p>
    <Flex direction="column" gap="3" maxWidth="500px">
      <form onSubmit={createAccount}>
        <h5>Email</h5>
        <Text size='2'>Note: This won't be visible to others. Only your display name below is what will be publically visible. Your email is used incase you forget your password and when necessary, billing management.</Text>
      <TextField.Root required  type="email"  onChange={(e) => setUser(e.target.value)} radius="none" placeholder="Email which serves as your login user name" />
      <h5 class='mt-2'>Display Name</h5>
      <Text size='2'>Note: Display name is what others will see whenever you make a post or leave a comment. It can be whatever you want up to 50 characters.</Text>
      <TextField.Root mt='' required  maxlength='50' type=""  onChange={(e) => setDisplayName(e.target.value)} radius="none" placeholder="Display name" />
      <h5 class='mt-2'>Password</h5>
    <TextField.Root  mt='' type="password" required onChange={(e) => setPwd(e.target.value)} radius="none" placeholder="Your password" />
    <Button mt='2' mb='2' >Create account</Button>

    {/* <TextField.Root required type="email" onChange={(e) => setEmail(e.target.value)} radius="none" placeholder="Email" /> */}
     

      {/* generate random string, send to user email, then store that string using hash into DB */}
    {/* <label
          Loaded Word/phrase:
          <input
            type="text"
            name="condition"
            value={user}
             onChange={(e) => console.log()}
          />
        </label> */}
    { createError && <Callout.Root color="red">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      {`Create account failed. Please try again. If it keeps failing please contact us at ${process.env.REACT_APP_EMAIL}`}
      <br></br>
      {errorMessage && `Error is: ${errorMessage}`}
    </Callout.Text>
  </Callout.Root>}

    <Callout.Root color="gray" variant="soft" highContrast>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text m='0'>
      After creating an account you will be sent to the login page to log in if you wish.
      </Callout.Text>
    </Callout.Root>
    
    <Heading mt='2' size='3'>Benefits to signing up</Heading>
      <Text>Access to exclusive content including early releases, discounts, special offers, and more. To learn more on what's coming press this.</Text>
      <Switch onCheckedChange={displaySignupInfo}></Switch>

          {showSignupInfo && <SignupInfo></SignupInfo>}
      </form>
  
  </Flex>
  </div>
  )
}

export default CreateAccount