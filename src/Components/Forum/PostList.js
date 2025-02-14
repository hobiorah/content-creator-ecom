import React from 'react'
import PostCard from './PostCard';
import { Flex, Text } from '@radix-ui/themes';

import { fetchData, postData, putData, apiURL} from '../../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";



const PostList = ({postType,parentObjectName, referencingObjectId}) => {

  const [postsToDisplay, setPostsToDisplay ] = useState(null);
  console.log(postType)
  console.log(referencingObjectId)

  useEffect(() =>{
    

    const fetchPosts = async () => {
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

      let fetchedPosts = await fetchData( apiURL + `/posts/${postType}/${referencingObjectId}`);
      console.log(fetchedPosts)
      //console.log(fetchedPosts.response.response.status)
      if(fetchedPosts.response && fetchedPosts?.response?.status  <= 200)
      {
        console.log(fetchedPosts?.response?.data);
        fetchedPosts = fetchedPosts.response.data
       // setBeliefToDisplay(fetchedBelief)
       // console.log(fetchedBelief.conditions)

       let posts = fetchedPosts.map(post => {
        console.log(post)
        console.log(parentObjectName)
        return <PostCard parentObjectName={parentObjectName} key={post.post_id} postId={post.post_id} title={post.title} postContent={post.content} created={post.created_at} author={post.user_display_name} postType={postType} referencingObjectId={referencingObjectId} ></PostCard>
       })       
       setPostsToDisplay(posts)
      
             
        
      }
     
  
  }

  fetchPosts()

  
  const cleanUp = () => {
    // isMounted = false;
    // controller.abort()
    console.log('cleanup called')
    // source.cancel();
}

return cleanUp;

  },[]);
  

  //fetch all posts for this post type. we will have post id which will be used to create link for post card
  //create a list of post cards. make api call and then past posts into postlit
  return (
    <>
      <Flex direction="column">{postsToDisplay}</Flex>
    </>
    

    // <div>PostList array structure of post cards</div>
  )
}

export default PostList



       

