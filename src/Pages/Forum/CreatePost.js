import React from 'react'

import { fetchData, postData, putData, apiURL } from '../../api/fetchData';
import parse from 'html-react-parser';
// import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

// import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../../Components/TextEditor';
import DataContext from '../../context/DataContext';
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Button, Box, Flex, TextField, Heading,Text} from '@radix-ui/themes';



const CreatePost = () => {
  const [postTitle, setPostTitle ] = useState(null);
  const [postContent, setPostContent ] = useState(null);
  const { loggedInUser, displayName, isUserLoggedIn,setIsUserLoggedIn } = useContext(DataContext);
  const [hasAccess, setHasAccess ] = useState(true);
  const [createPostDisabled, setCreatePostDisabled ] = useState(false);


  const navigate = useNavigate();

  const { postType,postId,referencingObjectId, objectName } = useParams();


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

 async function createPost(e) {

  setCreatePostDisabled(true)
  //post that creates a new post
  //insert on backend

    // e.preventDefault();
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

       const postToAdd = {
        "username": loggedInUser,
        "title": postTitle,
        "content": postContent,
        "referencing_post_type": postType,
        "referencing_post_parent_id": referencingObjectId,
        "objectName": objectName,
        displayName
     };
    


       let put =  await postData(apiURL + `/posts/${postType}/${referencingObjectId}/createPost`, postToAdd)
       console.log(put)
    setPostTitle(null)
    setPostContent(null)
        navigate(`/posts/${postType}/${referencingObjectId}/${objectName}`)
  
      }
    

  
  return (
    <>
    {hasAccess &&  
    <div>
          <Flex justify="center" direction="column" gap='2' > 
      {/* can center this horizontally in the flex container and since its row flex the next element will be after it*/}
      <Box width="500px">
      <Heading>Post title:</Heading>
        <TextField.Root placeholder="Enter Posttitle" size="3"  onChange={(e) => setPostTitle(e.target.value)}>
          {/* <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot> */}
        </TextField.Root>
      </Box>
      <Heading>Post content:</Heading>
      <TextEditor childToSet={setPostContent}></TextEditor>
      <Button disabled={createPostDisabled} variant="solid" size='3' onClick={createPost}>
          Create Post
        </Button>
    </Flex>

      </div> }
      {!hasAccess && <Text>You either don't have a subscription or haven't purchased the condition/solution this disuccsion forum is for.</Text>}

    </>
  )
}

export default CreatePost