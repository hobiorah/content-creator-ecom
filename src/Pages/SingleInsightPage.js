import React from 'react'
import DataContext from '../context/DataContext';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchData, deleteData, apiURL, postData} from '../api/fetchData';
import { checkIfAdmin } from './Admin/utility';
import parse from 'html-react-parser';
import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.bubble.css'
 import 'quill/dist/quill.snow.css'
import { Flex, Button, AlertDialog, Heading, Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';


import { useState, useEffect, useContext, useRef} from "react";
import TextEditor from '../Components/TextEditor';
import { CommentsList } from './Forum/PostPage';
import TherapyBenefits from '../Components/TherapyBenefits';





const SingleInsightPage = () => {
  const {insightToDisplay, setInsightToDisplay, setInsightsToRender, loggedInUser, isUserLoggedIn, displayName } = useContext(DataContext);
  const { insightId } = useParams();
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [topLevelCommentsToDisplay, setTopLevelCommentsToDisplay ] = useState(null);
  const [commentReply, setCommentReply ] = useState(null);
  const [submittedBlankReply, setSubmittedBlankReply ] = useState(false);
  const [disableReply, setDisableReply ] = useState(false);
  const [refreshEditor, setRefreshEditor ] = useState(false);


  const location = useLocation();







  
const deleteInsight = async () => {
  console.log(insightId)
  console.log(`id we lliking for ${insightId}`)
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

  let reqBody = {'id':insightId}
  let deletedInsight = await deleteData( apiURL + `/insights/${insightId}`, reqBody);
  console.log(`deleted condition for 1 pager is ${deletedInsight.response}`);
  //console.log(deletedBelief?.response.data);

  //deletedBelief = deletedBelief.response.data

  //going to this page means we fetch a belief that wont have conditions field of objects set 
  
    setInsightToDisplay(null)
   // setInsightsToRender((current) => { current.filter((insight) => insight._id!=insightId) })
    navigate('/insights')

}


  
useEffect(() =>{

  //if anything we need isnt set like tags, get the data. could do it all at once or break out with ifs to minimize requests

  //get tags. api/insights/tags
  const getInsight = async ()=> {
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
      // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

      console.log(apiURL)
      let fetchedInsight = await fetchData(apiURL + `/insights/${insightId}`);
      fetchedInsight = fetchedInsight?.response?.data;
      document.title = `Insight ${fetchedInsight.insightTitle}`;

      setInsightToDisplay(fetchedInsight);
     // divRef.current.innerHTML = fetchedInsight.insight;
  }

  const getInsights = async ()=> {
      // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
      // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

      let fetchedInsights = await fetchData(apiURL + '/insights');
      console.log(fetchedInsights)
      fetchedInsights = fetchedInsights?.response?.data;
     // setInsightList(fetchedInsights);
  }
 


  if(!insightToDisplay) //tags havent been retrieved for this session (not in localstorage or current state)
      getInsight();

  if(!topLevelCommentsToDisplay)
  fetchComments()

  checkIfAdmin(setIsAdmin);
  
  if(refreshEditor)
    setRefreshEditor(false)


  const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }

  return cleanUp;
},[insightToDisplay]);

const fetchComments = async () => {

  //http://localhost:4500/comments/post/3/11
  let topLevelComments = await fetchData( apiURL + `/comments/nonpost/${insightId}`);
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

//   useEffect(() =>{
  



//   fetchComments()

  
//   const cleanUp = () => {
//     // isMounted = false;
//     // controller.abort()
//     console.log('cleanup called')
//     // source.cancel();
// }

// return cleanUp;

//   },[]);

  async function createComment() {
    setDisableReply(true)
     //insert on backend

  // e.preventDefault();
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  const commentToPost = {
   "username": loggedInUser,
   "content": commentReply,
   "parentObjectType": 'insight',
   "referencing_post_parent_id": insightId,
   displayName,

};


  if(commentReply)
  {
    console.log('wtf')

    let put =  await postData(apiURL + `/comments/nonpost/insight/${insightId}/createComment`, commentToPost)
    //fetchComments();
    // console.log(put)

  setCommentReply(null)
  setSubmittedBlankReply(false)
  // setRefreshEditor(true)
  
  setDisableReply(false)
  window.location.reload();
  // navigate(location.pathname)

  }
  else 
    setSubmittedBlankReply(true)
    setDisableReply(false)
  //  navigate(`/posts/${postType}/${referencingObjectId}`)
  }

    //states get populated whehn insight button is presed
    //search bar
    //tags beneat - pull from insight db; should they just be conditions?
   // insightlist - pass insights to a ingightlist list component that we'll inlcude here
  return (
    insightToDisplay && 
    <div class='container'>
          <h3 class='mb-3  '>{insightToDisplay.insightTitle}</h3>
         { insightToDisplay.tags && <p><strong>Tags:</strong> {insightToDisplay?.tags.join()}</p>}
          {/* https://stackoverflow.com/questions/39758136/how-to-render-html-string-as-real-html */}
          <div ref={divRef}> {parse(insightToDisplay.insight)}</div> 
          {insightId==='677d58ee34bcee92913561ab' && <TherapyBenefits></TherapyBenefits>}
    <Flex class='mt-5'direction='column'>
      {/* <p>-----------</p> */}
        <h3>Leave a comment</h3>
          {isUserLoggedIn && <TextEditor refresh={refreshEditor} initText={''} childToSet={setCommentReply}></TextEditor>}
          {submittedBlankReply && <Callout.Root color='red' highContrast>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    You can't post a blank reply
                  </Callout.Text>
                </Callout.Root>}
          {!isUserLoggedIn ? <Button disabled>Log in to leave to a comment</Button>:<Button style={{width: '50%'}} disabled={disableReply} onClick={createComment}>Reply to Insight</Button>}
   </Flex>
   <Heading mt="5">Replies...</Heading>
   
    <div>
        {(topLevelCommentsToDisplay && insightToDisplay) && <CommentsList objectId={insightId} parentObjectType={'insight'} parentObjectName={insightToDisplay.insightTitle} nonPost={true} commentsToRender={topLevelCommentsToDisplay} ></CommentsList>}
    </div>
          
         
          
    {isAdmin &&
          <>
            <Button size='2' highContrast onClick={() => navigate(`/insights/${insightId}/edit`)}>Edit</Button>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">Delete</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete: {insightToDisplay.insightTitle}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure? This word/phrase will no longer be accessible and deleted from the DB
                  
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={deleteInsight}>
                      Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </>}

       
              
    </div>
    
  )
}

export default SingleInsightPage