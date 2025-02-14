import { Card, Heading, Separator, Text, Flex } from '@radix-ui/themes'
import React from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';


const PostCard = ({title, postContent, author, referencingObjectId, postType, postId, parentObjectName, created}) => {
    const navigate = useNavigate();



    function bro() {
        console.log("huh")
        console.log(postType)
        console.log(parentObjectName)
        
// all comments or post     http://localhost:4500/posts/belief/66b511731d68834467470d41/post/2/comments

         navigate(`/posts/${postType}/${referencingObjectId}/${parentObjectName}/post/${postId}`)
       // navigate(`/thefishappeins`)


    }
   
  return (
    <Card mt='2' onClick={bro} >
      <Flex justify='between'>
      <Heading>{title}</Heading>
      <Text size='1'>Created: {new Date(created).toLocaleString()}</Text>

      </Flex>
      
        <Text>{parse(postContent.substring(0,500))} </Text>
        <Text size='1'>Authored by: {author}</Text>
        {/* <Separator mt='2' orientation="horizontal" size="4" /> */}
    </Card>
  )
}

export default PostCard

