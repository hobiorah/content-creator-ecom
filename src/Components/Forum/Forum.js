import { Button, Heading, AlertDialog, Flex, Text, Em, Callout } from '@radix-ui/themes'
import {React, useContext, useEffect, useState}from 'react'
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import PostList from './PostList';
import { isLoggedIn } from '../../api/userManagement';
import DataContext  from '../../context/DataContext';
import { fetchData, apiURL } from '../../api/fetchData';
import { InfoCircledIcon } from '@radix-ui/react-icons';






const Forum = () => {
  const { search, setSearch, isUserLoggedIn,setIsUserLoggedIn } = useContext(DataContext);
  const [showLoginSuggesstion, setShowLoginSuggesstion ] = useState(false);
  const [hasAccess, setHasAccess ] = useState(true);



    const { postType,referencingObjectId, objectTitle } = useParams();
    
    const navigate = useNavigate();
    console.log(postType)
    console.log(referencingObjectId)

    useEffect(() =>{


      async function init() {
        if(postType=='condition')
        {
          let fetchedCondition = await fetchData(apiURL + `/conditions/${referencingObjectId}`);
          console.log(fetchedCondition?.response?.response?.status)
  
          if(fetchedCondition?.response?.response?.status!=401)
            setHasAccess(true)
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
      },[]); //not sure fi this is actually needed

    async function createPostHandler(){

      if(isUserLoggedIn)
      {
        console.log(isUserLoggedIn)
        navigate(`/posts/${postType}/${referencingObjectId}/${objectTitle}/createPost`)
      }
      else {
        setShowLoginSuggesstion(true);
      }

     

    }
    //got to fetch the object 
  return (
    <>
    {hasAccess && <div>
        <Heading>Discussions for {postType}: {objectTitle}</Heading>
       {!isUserLoggedIn ? <Button disabled>Log in to Create posts</Button>: <Button onClick={createPostHandler}>Create Post</Button>}
       <Callout.Root mt ='2' mb='5' size='1' color='gold' highContrast>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
          Note: If there isn't a lot of activity and you post questions expect priority support from our experts.
          </Callout.Text>
  </Callout.Root>
      {/* <Text size='2'> <Em>Note: If there isn't a lot of activity in the forum and you post questions expect priority support from our experts.</Em></Text> */}
        <PostList postType={postType} parentObjectName={objectTitle} referencingObjectId={referencingObjectId}></PostList>

        {showLoginSuggesstion && <AlertDialog.Root>
            {/* <AlertDialog.Trigger>
              <Button color="red">Revoke access</Button>
            </AlertDialog.Trigger> */}
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Revoke access</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure? This application will no longer be accessible and any
                existing sessions will be expired.
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button onClick={()=>setShowLoginSuggesstion(false)}variant="soft" color="gray">
                    Ok
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
            
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>}
    </div>}
    {!hasAccess && <Text>You either don't have a subscription or haven't purchased the condition/solution this disuccsion forum is for.</Text>}
    </>


    
  )
}

export default Forum