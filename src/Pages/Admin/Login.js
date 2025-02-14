import { Button, Callout, Flex, Heading, Link, Text, TextField, Switch } from '@radix-ui/themes'
import React from 'react'
import { fetchData, postData, putData, apiURL} from '../../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import DataContext from '../../context/DataContext';
import { useNavigate, useLocation } from 'react-router';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import SignupInfo from '../../Components/SignupInfo';

const Login = () => {

  const { search, setSearch, isUserLoggedIn,setIsUserLoggedIn, setLoggedInUser, setDisplayName } = useContext(DataContext);
   let navigate = useNavigate();
   const location = useLocation();

    const [user, setUser ] = useState(null);
    const [pwd, setPwd ] = useState(null);
    const [loginError, setLoginError ] = useState(false);
    const [showSignupInfo, setShowSignupInfo] = useState(false);



    function displaySignupInfo(e)
    {
      console.log(e)
      setShowSignupInfo(e)

    }

    async function login(e) {
        console.log(user)
        console.log(pwd)
    //     //e.preventDefault();
      
        // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    //     const { user, pwd } = req.body;

        const loginDetails = {
          "user": user,
          "pwd": pwd,  
          
      };         
          
            let loginResponse = await postData(apiURL + `/auth/`, loginDetails);
            console.log(loginResponse)
            if(loginResponse?.response?.status >=200)
            {
              let {displayName} = loginResponse.response.data
              setIsUserLoggedIn(true);
              setLoginError(false)
              console.log(user)
              setLoggedInUser(user)
              console.log(displayName)
              setDisplayName(displayName)
              console.log(location?.state?.pathCameFrom)
              let toGoTo = location?.state?.pathCameFrom
              console.log(toGoTo)
                navigate(toGoTo);

              // navigate(0)
            } else {
              setLoginError(true)
            }
             
              
            //let adminIN = await fetchData( apiURL + `/auth/checkAdminLoggedIn/`);
            // console.log(adminIN)


      
      }

// make login api request which should put cookine in broswer. in pages whre cookies is needd, can do isloggedin and browser should send cookie 
  return (
    <div class='container'>
      <Flex direction="column" gap="3" maxWidth="500px">
        <h4>Username</h4>
    <TextField.Root onChange={(e) => setUser(e.target.value)} radius="none" placeholder="Username" />
      <h4>Password</h4>
    <TextField.Root type='password' onChange={(e) => setPwd(e.target.value)} radius="none" placeholder="Enter password here" />
     
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
    <Button size="3" onClick={login}>Login</Button>
    <Heading >Forgot your password?</Heading>

    <Text >Tell us you lost/forgot by selecting "Forgot Password" with this <a href={`${process.env.REACT_APP_CONTACT_FORM}`}>form</a> and we'll send you a new one to the email you registered with password feature coming soon.</Text>
    {/* send them password to their email. creata new password for them */}
  { loginError && <Callout.Root color="red">
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>
      Check your login information. It's not correct
    </Callout.Text>
  </Callout.Root>}

    <Callout.Root color="gray" variant="soft" highContrast>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <Heading size='4'>Don't have an account?</Heading>
          If you don't have an account to log in with you can create a free one <Link color='red'  href="/createAccount">here.</Link>
          <br></br><br></br>
          <Text>Those who sign up get access to exclusive content including early releases, discounts, special offers, and more. To learn more on what's coming press this</Text> <Switch onCheckedChange={displaySignupInfo}></Switch>

          {showSignupInfo && <SignupInfo></SignupInfo>}

        </Callout.Text>
    </Callout.Root>

    
  
  </Flex>
    </div>
    
  )
}

export default Login