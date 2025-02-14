import {React, useState, useEffect, useContext} from 'react'
import { Link, useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { fetchData, postData, apiURL } from '../../api/fetchData';
import { Flex, Text, Button, Card, Box, Heading, Strong, Callout } from '@radix-ui/themes';
import TextEditor from '../../Components/TextEditor';
import DataContext from '../../context/DataContext';

import parse from 'html-react-parser';
import { InfoCircledIcon } from '@radix-ui/react-icons';


const PostPage = ({}) => {
  const { search, setSearch,loggedInUser, isUserLoggedIn,setIsUserLoggedIn, displayName } = useContext(DataContext);


const { postType,postId,referencingObjectId, parentObjectName } = useParams();
const location = useLocation();
const navigate = useNavigate();


    //get post based on id 
    //api/query to get all comments with no parent but have this post as a foreign key - pass this to post comments component 
    //
    const [topLevelCommentsToDisplay, setTopLevelCommentsToDisplay ] = useState(null);
    const [postToDisplay, setPostToDisplay ] = useState(null);
    const [postCommentReply, setPostCommentReply ] = useState(null);
    const [textInit, setTextInit ] = useState('');


    const [blankText, setBlankText ] = useState(false);
    const [disableReply, setDisableReply ] = useState(false);


    // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

console.log(parentObjectName)


    const fetchPost = async () => {
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

      let fetchedPost = await fetchData( apiURL + `/posts/${postId}`);
      console.log(fetchedPost)
      if(fetchedPost.response)
      {
        console.log(fetchedPost?.response?.data);
        fetchedPost = fetchedPost.response.data
       // setBeliefToDisplay(fetchedBelief)
       // console.log(fetchedBelief.conditions)

       setPostToDisplay(fetchedPost)
        
      }
     
  
  }

  const fetchComments = async () => {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

    //http://localhost:4500/comments/post/3/11
    let topLevelComments = await fetchData( apiURL + `/comments/post/${postId}`);
    console.log(topLevelComments)
    if(topLevelComments.response)
    {
      console.log(topLevelComments?.response?.data);
      topLevelComments = topLevelComments.response.data
     // setBeliefToDisplay(fetchedBelief)
     // console.log(fetchedBelief.conditions)
     setTopLevelCommentsToDisplay(topLevelComments)
     
    //  let topLevelComments = topLevelComments.map(post => {
    //   console.log(topLevelComments)
    //   return <PostCard key={post.post_id} postId={post.post_id} title={post.title} postContent={post.content} author={post.username} postType={postType} referencingObjectId={referencingObjectId} ></PostCard>
    //  })       
      
    }


}

    useEffect(() =>{
    

  
    fetchPost()

    fetchComments()
  
    
    const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }
  
  return cleanUp;
  
    },[postCommentReply]);

    async function createPostComment() {
       //insert on backend

    // e.preventDefault();
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
    const commentToPost = {
     "username": loggedInUser,
     "content": postCommentReply,
     "parentObjectType": postType,
     "referencing_post_parent_id": referencingObjectId,
     "parentObjectName": parentObjectName,
     displayName,
     linkToContent: process.env.REACT_APP_CLIENT_SERVER + process.env.REACT_APP_CLIENT_PORT + location.pathname
  };
 
  let put;
  if(postCommentReply)
  {
    setDisableReply(true)

    put =  await postData(apiURL + `/comments/post/${postId}/createComment`, commentToPost);
      setBlankText(false);
      console.log(put)
    
    setPostCommentReply(null)
    setDisableReply(false)

    window.location.reload();  
  }
  else
    setBlankText(true)
    //fetchComments();
}


  return (
   <>
   <Flex direction="column">
   <Heading>{postToDisplay && postToDisplay.title}</Heading>
      <Text>{postToDisplay && parse(postToDisplay?.content)}</Text>
      <Text  style={{
            'align-self': 'flex-end'
        }}>Author: {postToDisplay && postToDisplay?.user_display_name}</Text>
      <Text style={{
            'align-self': 'flex-end'
        }}>Created: {postToDisplay && new Date(postToDisplay?.created_at).toLocaleString()}</Text>
        {/*   new Date(fetchedPost?.created_at).toLocaleString() */}
      {postToDisplay?.last_edited && <Text>Last Edited: {postToDisplay && new Date(postToDisplay?.last_edited).toLocaleString()}</Text>}
      {isUserLoggedIn && <TextEditor initText={''} childToSet={setPostCommentReply}></TextEditor>}
      {blankText && <Callout.Root color='red' highContrast>
	<Callout.Icon>
		<InfoCircledIcon />
	</Callout.Icon>
	<Callout.Text>
		You can't post a blank reply
	</Callout.Text>
</Callout.Root>}
      {!isUserLoggedIn ?<Callout.Root highContrast>
	<Callout.Icon>
		<InfoCircledIcon />
	</Callout.Icon>
	<Callout.Text>
		Remember to login to reply to this post or a comment
	</Callout.Text>
</Callout.Root> :<Button disabled={disableReply} style={{width: '50%'}} onClick={createPostComment}>Reply to this Post</Button>}
   </Flex>

   <Heading mt="5">Replies to this post...</Heading>
     
   
    <div>
        {topLevelCommentsToDisplay && <CommentsList parentObjectType={postType} parentObjectName={parentObjectName} parentObjectId={referencingObjectId} commentsToRender={topLevelCommentsToDisplay} ></CommentsList>}
    </div>
  </> 
  )
}

// export default PostPage



const CommentsList = ({parentObjectType, commentsToRender, nonPost, objectId, parentObjectId, margin, parentObjectName}) => {
    //iterate through list and render a comment component for each item 

     commentsToRender = commentsToRender.map(comment => {
      console.log(comment)
      return <CommentCard parentObjectType={parentObjectType} parentObjectName={parentObjectName} nonPost={nonPost} parentObjectId={parentObjectId} key={comment.comment_id} postId={comment.post} commentId={comment.comment_id} commentContent={comment.content} author={comment.user_display_name} lastEdited={comment.last_edited} createdAt={comment.created_at} parentCommentId={comment.parent_comment_id}></CommentCard>
     })     

    return (
      <Flex mt="2" gap="1" direction='column'>
          {commentsToRender ? commentsToRender: 'no comments for this post'}
      </Flex>
    )
  }


  const CommentCard = ({parentObjectType, parentObjectName, nonPost, objectId, commentId,createdAt,author, commentContent,postId,lastEdited,parentCommentId}) => {
    const { search, loggedInUser, isUserLoggedIn,setIsUserLoggedIn, displayName } = useContext(DataContext);
    const location = useLocation();



    //comment
    //created date
    //author
    //list of comments that are reply ordered by their create date. all comments have this comment as parent. iterate through this list 
    //parent comment - foreign key
    //post
    const [childCommentsToDisplay, setChildCommentsToDisplay ] = useState(null);
    const [margin, setMargin ] = useState(null);
    const [commentReply, setCommentReply ] = useState(null);
    const [blankReply, setBlankReply ] = useState(null);
    const [displayReplyBox, setDisplayReplyBox ] = useState(false);
    const [textInit, setTextInit ] = useState('');
    const [disableReply, setDisableReply ] = useState(false);





    const fetchChildComments = async () => {
        
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

      //http://localhost:4500/comments/post/3/11 router.route('/nonpost/:objectId/:commentId')

      let childComments;
      console.log(commentId)
      console.log('shoudl be getting boolean?')
      console.log(nonPost)
      console.log(parentObjectType)
      //can convert to list later
      if(parentObjectType!=='insight')
         childComments = await fetchData( apiURL + `/comments/post/${postId}/${commentId}`);
      else
        childComments = await fetchData( apiURL + `/comments/nonpost/${objectId}/${commentId}`);
      console.log(childComments)
      if(childComments.response)
      {
        console.log(childComments?.response?.data);
        childComments = childComments.response.data
       // setBeliefToDisplay(fetchedBelief)
       // console.log(fetchedBelief.conditions)
       setChildCommentsToDisplay(childComments)
       setMargin(10)
        
      }
  
  }


    useEffect(() =>{
    

    console.log(parentCommentId)
         fetchChildComments()
  
    
    const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }
  
  return cleanUp;
  
    },[]);

    function processReplyButton(){

      if(!displayReplyBox){
        setDisplayReplyBox(true)
        setCommentReply('')
      }

      if(displayReplyBox){

        setDisplayReplyBox(false)
        createCommentReply()
      }
    }

    async function createCommentReply() {
     
      //insert on backend

   // e.preventDefault();
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

      const commentToPost = {
        "username": loggedInUser,
        "content": commentReply,
        parentObjectName,
        parentObjectType,
        displayName,
        linkToContent: process.env.REACT_APP_CLIENT_SERVER + process.env.REACT_APP_CLIENT_PORT + location.pathname 

    };

    let put;
    console.log('is it not null?',commentReply)
    if(commentReply)
    {
      setDisableReply(true)
      if(parentObjectType==='insight')
        put =  await postData(apiURL + `/comments/nonpost/insight/${objectId}/createReplyComment/${commentId}`, commentToPost)
    else
      put =  await postData(apiURL + `/comments/post/${postId}/createReplyComment/${commentId}`, commentToPost)
      //  http://localhost:4500/comments/nonpost/insight/66bf5497e01f6a4fa2d65c3a/createReplyComment/1
      // put =  await postData(apiURL + `/comments/post/${postId}/createReplyComment/${commentId}`, commentToPost)
    //fetchChildComments();
   // console.log(put)

    setCommentReply(null)
    setBlankReply(false)
    setDisableReply(false)
    window.location.reload();

    }
    else 
      setBlankReply(true)
   //  navigate(`/posts/${postType}/${referencingObjectId}`)
   }



    return (
      <Box mt={0} maxWidth="">
      <Card ml={margin} variant='classic' size='3'>
        <Flex direction="column" gap="" align="">
        {author && <Text as="p"  mt="" color="" ><Strong>Reply from: {author} </Strong></Text>}          
            {commentContent && <Text as="p"  mt="" color="" >{parse(commentContent)} </Text>}
             {lastEdited ? <Text as="p" size='1' mt="1" weight="medium">{lastEdited} </Text>:  ''}
             <Text size="1" style={{'align-self': 'flex-end'}}>Created: {createdAt &&  new Date(createdAt).toLocaleString()}</Text>
               {lastEdited && <Text  size="1">Last Edited: {lastEdited && lastEdited}</Text>}
               {!isUserLoggedIn ? '': <Button mt="1" color="gray" variant="soft" style={{'align-self': 'center'}} onClick={processReplyButton}>{!displayReplyBox ? "Reply":"Submit Reply"}</Button>}  
             
              { displayReplyBox && <Button mt="1" color="gray" variant="soft" style={{'align-self': 'center'}} onClick={() => setDisplayReplyBox(false)}>Cancel</Button>}
              

               {displayReplyBox && <TextEditor initText={textInit} childToSet={setCommentReply}></TextEditor>}
               {blankReply && <Callout.Root color='red' highContrast>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    You can't post a blank reply
                  </Callout.Text>
                </Callout.Root>}
 
               {childCommentsToDisplay && <CommentsList parentObjectType={parentObjectType} parentObjectName={parentObjectName} margin={10} nonPost={true} commentsToRender={childCommentsToDisplay}></CommentsList>}
        </Flex>
      </Card>
    </Box>
    )
  }



  export { PostPage, CommentsList, CommentCard };
