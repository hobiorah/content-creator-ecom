import logo from '../logo.svg';
// import '../App.css';
import { Link, useParams, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataContext from '../context/DataContext';
import parse from 'html-react-parser';

import { fetchData, deleteData, apiURL, postData } from '../api/fetchData';
import BeliefList from '../BeliefList';
import { Flex, Button, AlertDialog, Text, Heading, Em, Checkbox, IconButton, Box, Strong, Card, HoverCard, Callout, Switch, Select, DropdownMenu } from '@radix-ui/themes';

import { checkIfAdmin } from '../Pages/Admin/utility';
import { getConditionsbyType } from '../api/conditions';
import FearTriggerCTA from '../Components/FearTriggerCTA';
import { hasAccessToObject, getAccessInfo } from '../api/userManagement';
import { ArrowUpIcon, ChatBubbleIcon, CheckCircledIcon, InfoCircledIcon, Link2Icon } from '@radix-ui/react-icons';
import { determineIfLockedUtil } from './conditionUtility';
import PaymentInfo from '../Components/PaymentInfo';
import SignupInfo from '../Components/SignupInfo';
import { removeLinkStyling } from '../Components/universalStylingProps';
import SubscriptionBox from '../Components/SubscriptionBox';


function searchForBelief(belief) {
  //move to belief list page; iterate through all beleifs and generate a single beleif component for each matching belief
  //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
}
 function ConditionPage() {
    const { loggedInUser,searchedForBelief, setsearchedForBelief, beliefListToDisplay, setBeliefListToDisplay  } = useContext(DataContext);
   const navigate = useNavigate();
    const { id } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasTriggers, setHasTriggers] = useState(false);
    const [pageisLocked, setPageIsLocked] = useState(true);
    const [accessRequired, setAccessRequired] = useState('');



    const [hasFears, setHasFears] = useState(false);
    const [conditionToDisplay, setConditionToDisplay] = useState(null);
    const [conditionName, setConditionName] = useState(null);
    const [conditionPreview, setConditionPreview] = useState(null);

    const [showSignupInfo, setShowSignupInfo] = useState(false);
    



    const location = useLocation();


    

    function displaySignupInfo(e)
    {
      console.log(e)
      setShowSignupInfo(e)

    }

    

    
  const getCondition = async ()=> {
    // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;

  
    let fetchedCondition = await fetchData(apiURL + `/conditions/${id}`);
    console.log(fetchedCondition)
    console.log('status',fetchedCondition.response.status)
    if(fetchedCondition.response.status==200)
    {
     
      fetchedCondition = fetchedCondition?.response?.data;
      document.title = `Clarity's solution for ${fetchedCondition.condition}`;
      // setConditionsToDisplay(fetchedConditions);
      //get beleifs for condition - find beliefs that have this condition id 
   //set condition list so conditon page can use to render a beleif list
   
     setConditionToDisplay(fetchedCondition)
     let fetchedBeliefs = await fetchData(apiURL + `/beliefs/condition/${id}`);
     console.log(fetchedBeliefs);
     //set beleif list which will be used to create belief cards on next page
     setBeliefListToDisplay(null)
     if(fetchedBeliefs?.response?.data.length >0)
      setBeliefListToDisplay(fetchedBeliefs?.response?.data);
     console.log(fetchedBeliefs?.response?.data);
   
    } 
    else{
      let limitedCondition  = await fetchData(apiURL + `/conditions/${id}/limited`);
      document.title = `Clarity's Solution for ${limitedCondition.response.data.condition}`
      console.log('limited conditoin', limitedCondition.response.data.condition)
      setConditionName(limitedCondition.response.data.condition)
      setConditionPreview(limitedCondition.response.data.preview)
      let access = await isLocked(id,null);
      console.log(access)

    // setPageIsLocked(access.boolean)
    setAccessRequired((access.accessRequired).toLowerCase())
    }
   
    
   
}

const deleteCondition = async () => {
  console.log(id)
  console.log(`id we lliking for ${id}`)
  // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
  let reqBody = {'id':id}
  let deletedCondition = await deleteData( apiURL + `/conditions/${id}`, reqBody);
  console.log(`deleted condition for 1 pager is ${deletedCondition.response}`);
  //console.log(deletedBelief?.response.data);

  //deletedBelief = deletedBelief.response.data

  //going to this page means we fetch a belief that wont have conditions field of objects set 
  
  setConditionToDisplay(null)
    navigate('/conditions')

}


async function checkForMore() {
  //make api call to get conditions of type trigger with this condition jd /conditions/type
  let triggers = await getConditionsbyType(id, 'trigger')
  console.log(triggers)
  if(triggers && triggers.length > 0)
    setHasTriggers(true)


let fears = await getConditionsbyType(id, 'fear')
console.log(fears)
  if(fears && fears.length > 0)
    setHasFears(true)

}


async function isLocked(condition, access){

  let showLock = false;
 showLock = await determineIfLockedUtil(condition, access)
 console.log('wtf is locked0' + showLock)
/*
  let globalConditionAccess = await fetchData(apiURL + `/user/access/condition`);
  console.log(globalConditionAccess)
  globalConditionAccess = globalConditionAccess?.response?.data?.accesses.user
  console.log(globalConditionAccess)

  // console.log(globalConditionAccess?.response?.data?.accesses)
  // console.log(globalConditionAccess?.response?.data?.type)


  
  //logged in and not a condition free to all
  if(access && !globalConditionAccess.includes(condition._id) )
    {
      console.log(access)
      let parentAccess = false;
      if(condition?.parentConditions && condition?.parentConditions.length >=1)
      {
        //check if we have access to any parent conditions
        condition?.parentConditions.forEach((parentId,i) => {
          if(access[parentId])
          {
            parentAccess = true;
          }
              
        })
        //are any of these parent condition in global list. check if global list contains a parent condition
       console.log('run the test'+ condition?.parentConditions.every(parentCondition => globalConditionAccess.includes(parentCondition)))
        console.log('parent access' + parentAccess + condition?.parentConditions.includes(globalConditionAccess))
        //check if parent is social anxiety only if we dont already have access
        if(!parentAccess && condition?.parentConditions.every(parentCondition => globalConditionAccess.includes(parentCondition)) )
          parentAccess=true;
      }
      console.log(access['subscribed'] || access[condition._id])
      //if no access then show lock should be true
       showLock = (access['subscribed'] || access[condition._id] || parentAccess ) ? false : true
      //not logged in with access object and condition isn't social anxiety or a child condition of SA
    } else if( !access && condition._id!=='66df6fd0e95bed6217424ab1' && !condition?.parentConditions  )
    {          
      showLock=true
      }
      //no access, not SA parent condition but a child condition
     else if( !access && condition._id!=='66df6fd0e95bed6217424ab1' && condition?.parentConditions  )
      {
        //if has a parent condition and parent dont contain social anxiety
        if (condition?.parentConditions.length >=1 && !condition?.parentConditions.every(parentCondition => globalConditionAccess.includes(parentCondition)))
        {console.log('in here?')
          showLock=true
        }
      }
        */

      return showLock
  
}




useEffect(() =>{


async function init() {
  if(!conditionToDisplay) //tags havent been retrieved for this session (not in localstorage or current state)
  {
    console.log('is this being called')

    await getCondition();
  } 

  await checkIfAdmin(setIsAdmin); 
  if(isAdmin)
    setPageIsLocked(false)
  else
  {
    console.log(loggedInUser)
    let accessObject = await getAccessInfo(loggedInUser)
    console.log(accessObject);
    console.log(conditionToDisplay)
    if(conditionToDisplay)
    {
      let access = await isLocked(conditionToDisplay,accessObject);
      console.log(access)
      await checkForMore();

    setPageIsLocked(access.boolean)
    setAccessRequired((access.accessRequired).toLowerCase())

    }
    // if(!conditionToDisplay.parentConditions || conditionToDisplay.parentConditions.length==0)
    //   {
    //     access = await hasAccessToObject(id, accessObject)
    //   } 
    //   else{
    //     //check if user has access to anything in the parent list

    //   }
    

  }

  
  

  // await checkForMore();

  //if anxiety, get triggers, fears, and set to pass to conditionlist to render
}

 init()
 



  const cleanUp = () => {
      // isMounted = false;
      // controller.abort()
      console.log('cleanup called')
      // source.cancel();
  }

  return cleanUp;
},[loggedInUser, conditionToDisplay]); //not sure fi this is actually needed

    
    
async function purchaseCondition() {
  let base = process.env.REACT_APP_ENV==='dev' ? process.env.REACT_APP_CLIENT_SERVER + process.env.REACT_APP_CLIENT_PORT : process.env.REACT_APP_PROD_CLIENT_SERVER

  insertEvent('click',{'button':'direct purchase'})

  let payload =  {
    "id": id,
    "username": loggedInUser,
    'objectType': 'condition',
    "successURL": base + `conditionPurchase/${id}?success=true`,
    "cancelURL": base + `conditionPurchase/${id}?canceled=true`
  }
  let {response} = await postData(apiURL + `/payment/createCheckoutSession`,payload);
  console.log(response)
  console.log(response.status)

  if(response && response?.status>=200)
      window.location.href = response?.data?.redirect
 // setConditionsToDisplay(fetchedConditions);


}

async function purchaseSubscription() {
  

  //insertEvent('click',{'button':'subscription'})

  let payload =  {
    "id": id,
    "username": loggedInUser,
    'objectType': 'condition'
  }

  insertEvent('click',{'button':'subscription'})

  let {response} = await postData(apiURL + `/payment/createSubscriptionCheckout`,payload);
  console.log(response)
  console.log(response.status)

  if(response && response?.status>=200)
      window.location.href = response?.data?.redirect
 // setConditionsToDisplay(fetchedConditions);

}

async function insertEvent(action,metadata)
{

  if(process.env.NODE_ENV==='prod')
  {
    let payload =  {
      "username": loggedInUser,
      'metadata': {...metadata, 'fileName':'ConditionPage.js'},
      "page": location.pathname,
      "action": action
    }
    console.log('location object', location)
  
     let {response} = await postData(apiURL + `/events/addEvent`,payload);
  
  }

}


 
    console.log(conditionToDisplay);
    
  return (
    
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
   <div class="container">
    
     <Flex  wrap ='true' justify='between'>
      {/* when we get full condition */}
      {conditionToDisplay && <h1>{conditionToDisplay.condition} </h1>}
     
      {/* when we dont have acces and only get limited */}
      {conditionName && <h1>{`Clarity's Solution for: ` + conditionName} </h1>}

        {(conditionToDisplay && !pageisLocked) && <div><a href={`/condition/${id}/trigger/${conditionToDisplay.condition}`} class="btn btn-sm r-36 btn--tra-black hover--purple"onClick={() =>
          {
            insertEvent('click',{'button':'forum',"objectName":`${conditionToDisplay.condition}`})
            navigate(`/posts/condition/${id}/${conditionToDisplay.condition}`) 
       }}>Discuss this <br></br>with others</a> </div>
        
        
        // <Button color='gold' highContrast size="3" mt="1"  
        // } >Discuss this <br></br>with others</Button>
        }
        </Flex>
        <div class='text-center'>

        {conditionToDisplay?.parentConditions && <Text highContrast size='3' mt='2' color='red'> If you haven't already, we <strong>highly</strong> recommend you first read <a href='https://medium.com/@theclarityapp/unpacking-the-science-the-psychological-root-cause-of-anxiety-be1efa46d07b'>"The psychological root cause of anxiety"</a> before consuming our anxiety solutions. It'll take ~1min.</Text>}

        </div>
        
        
    
    {/* updte this to be a array in list pulled from api */}
    {(conditionToDisplay && (!pageisLocked || id==='')) && 
      <div className=''>
        
       
     {/* Triggers button */}
          {/* {hasTriggers && <a href={`/condition/${id}/trigger/${conditionToDisplay.condition}`} style={{removeLinkStyling}}><button href='test' style={{
          'background-color': '#641723', color: 'white', 'border-radius':'6px', border: 'none', 'margin-bottom':'5px', height: '48px', 'font-size': '18px', 'font-weight': '500'
        }} color="red" mb='2' mr="2" highContrast size="4" onClick={async() => {
            insertEvent('click',{'button':'triggers',"objectName":`${conditionToDisplay.condition}`})

            }}>{`${conditionToDisplay.condition} triggers plus their solutions`}</button></a>} */}

{hasTriggers && <a href={`/condition/${id}/trigger/${conditionToDisplay.condition}`} class=" btn btn-sm  r-36 btn--black  hover--tra-purple" onClick={async() => {
            insertEvent('click',{'button':'triggers',"objectName":`${conditionToDisplay.condition}`})}}>{`${conditionToDisplay.condition} triggers plus their solutions`}</a> 
}





{/* Fears button */}
        {hasFears && <a class="btn btn-sm r-36  btn--theme hover--black" href={`/condition/${id}/fear/${conditionToDisplay.condition}`} onClick={async () => 
        {
          insertEvent('click',{'button':'fears',"objectName":`${conditionToDisplay.condition}`})
          // navigate(`/condition/${id}/fear/${conditionToDisplay.condition}`)
        }}>{`Solutions for the underlying fears that cause ${conditionToDisplay.condition}`}</a>}

<Callout.Root mt ='2' mb='2' size='1' color='gold' highContrast>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text m='0'>
          <p class='m-0'> Note: If you are confused about anything in this solution or have problems we haven't covered we encourage you to make a post in the <a class='color--blue' href={`/posts/condition/${id}/${conditionToDisplay.condition}`}>discussion forum</a> to ask any questions. 
          
          {id==='66df6fd0e95bed6217424ab1' && <><br></br><br></br>Also, we are constantly updating our social anxiety solution. To receive notifications when we make additions just make a <Link class='color--purple' to="/createAccount" > free account</Link>. To see planned updates click this.<Switch onCheckedChange={displaySignupInfo}></Switch></> } </p>

          {showSignupInfo && <SignupInfo></SignupInfo>}
            
          </Callout.Text>
  </Callout.Root>

        {/* <h2>Our Definition: </h2> */}
        {conditionToDisplay?.ourDefinition && parse(conditionToDisplay?.ourDefinition )}
        {conditionToDisplay?.thirdPartyDefinition?.sourceLink && <h3>Definition from  <a href={conditionToDisplay?.thirdPartyDefinition?.sourceLink}>{conditionToDisplay?.thirdPartyDefinition?.sourceLink}</a> </h3>}
        <p>{conditionToDisplay?.thirdPartyDefinition?.definition && parse(conditionToDisplay.thirdPartyDefinition.definition )}</p>
       { beliefListToDisplay && <><h4 class='mb-2'>{`Root cause limiting beliefs you may have to dismantle:`}</h4> 
        {/* belieflist shared state variable is set in condition list before navigateing to this page. will always be set because we either pass in from search or set when we pull condition data */}
        <Flex mb='3' wrap="true"> <BeliefList ></BeliefList></Flex></>}


        
      {/* drop down only for social anxiety solution */}
        
        {
          
          id==='66df6fd0e95bed6217424ab1' && <>

<h5 size='3' class='mb-2'>Use the drop-down to see all the ways we can help</h5>
        <DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="solid" size="2">
				Select an option
				<DropdownMenu.TriggerIcon />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content size="2">
			<DropdownMenu.Item  ><a className='hideLink' href={`/condition/${id}/trigger/${conditionToDisplay.condition}`} underline='none'>See solutions to <br></br>social anxiety triggers you may have</a></DropdownMenu.Item>
      <DropdownMenu.Separator />
			<DropdownMenu.Item ><a className='hideLink' href={`/condition/${id}/fear/${conditionToDisplay.condition}`} style={{removeLinkStyling}}>See solutions for the underlying fears that<br></br> cause social anxiety</a></DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item ><a href={`/posts/condition/${id}/${conditionToDisplay.condition}`} className='hideLink' >Discuss Social anxiety with others</a> </DropdownMenu.Item>

			<DropdownMenu.Separator />
			<DropdownMenu.Item >
      <a className='hideLink' href={`https://forms.gle/os4qba2HZpTcvoWk6}`}>Provide feedback to improve this solution</a>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
        
          
          

          
          </> 
        }
        {(conditionToDisplay?.type==='fear' || conditionToDisplay?.type==='trigger') && <FearTriggerCTA></FearTriggerCTA>}

        <Flex  wrap="wrap">
       {
        id!=='66df6fd0e95bed6217424ab1' &&  <a class="btn btn-sm r-36 btn--tra-black hover--tra-black mt-2" onClick={() => 
           {
             insertEvent('click',{'button':'forum',"objectName":`${conditionToDisplay.condition}`})
            navigate(`/posts/condition/${id}/${conditionToDisplay.condition}`)
          }}>Discuss this with others <ChatBubbleIcon></ChatBubbleIcon></a>
        }

{/* {
id!=='66df6fd0e95bed6217424ab1' && <a style={{ display: 'block'
          
        }} href="https://forms.gle/os4qba2HZpTcvoWk6">
        <button color='gold' mt='3' ml='2' radius="Full"  style={{
          'background-color': '#8C7A5E', color: 'white', 'border-radius':'6px', border: 'none', 'margin-top':'12px', 'font-weight': '550', height:'40px'
        }} size="3"  variant="solid" highContrast > Provide feedback to improve this solution<Link2Icon />
        </button>
      </a>
 } */}

{/* only show provide feedback when not SA because we have drop down for SA */}
{
id!=='66df6fd0e95bed6217424ab1' && <a href={`https://forms.gle/os4qba2HZpTcvoWk6`}  class='btn r-36 mt-2 btn--black btn-sm'   onClick={() => 
           {
             insertEvent('click',{'button':'feedback',"objectName":`${conditionToDisplay.condition}`})
          }}>Provide feedback to improve this solution<Link2Icon /></a>
        }
      
        </Flex>

        {id==='66df6fd0e95bed6217424ab1' && 
        <Callout.Root mt='5' color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
        We are constantly updating our social anxiety solution. To receive notifications when we make additions just make a <Link to="/createAccount" > free account</Link>. To see planned updates click this. <Switch onCheckedChange={displaySignupInfo}></Switch>
    {showSignupInfo && <SignupInfo></SignupInfo>}
        {/* <HoverCard.Root>
       
        
            <HoverCard.Trigger>
              <Link> hover here</Link>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <SignupInfo></SignupInfo>
            </HoverCard.Content>
            
	</HoverCard.Root>   */}
  {/* <Button onClick={() => navigate('/createAccount')} >Sign up to be notified of updates
            </Button> */}
</Callout.Text>
  </Callout.Root>
 }



        <h5 className='mt-2'>Looking for more?</h5>
        <p>If you'd like to understand this condition more or want 1on1 help overcoming it submit a request to get additional support. Otherwise, we suggest posting in the community which our experts watch. <Link to="https://forms.gle/JgudBDb8FKPcK8wGA">Get help with your unique situation. </Link> </p>
        
        <h5>Have something to add?</h5>
        <p>If there is anything here you think can be improved to help someone overcome this condition we'd love to hear it. We may update this page with your input. {<a  class='text-primary' href="https://forms.gle/os4qba2HZpTcvoWk6">Contribute</a>}</p>
        {isAdmin && 
        <> 
          <Button size='2' highContrast onClick={() => navigate(`/condition/${id}/edit`)}>Edit</Button>
          <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="red">Delete</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete: {conditionToDisplay.condition}</AlertDialog.Title>
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
                    <Button variant="solid" color="red" onClick={deleteCondition}>
                      Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </>}
    </div>
    }
    {/* {!conditionToDisplay && 
      // <p>Loading..</p>
     } */}
     {/* user is logged in but doesnt have access */}
     { (pageisLocked && loggedInUser!=null) && <Flex direction='column' >
      <Card> <p><h4>Solution Preview:</h4> </p>
          <p>{parse(`${conditionPreview}`)}</p>
          </Card>
    
      <h5 class='mt-2'>Get full access</h5>
        <p>This premium content {`${accessRequired}`}. To get started create a <a class='color--purple' href='/createaccount'>free account</a>. With your free account you'll be able to view this content for free, get a subscription, or purchase it directly (~2-5$). </p>
        
    
         <p>
          Subscriptions are {`${process.env.REACT_APP_SUBSCRIPTION_PRICE}`}$ and give you access to all existing and soon-to-be-released premium solutions, content, and forums.  <em>Note: Solutions for <a class='color--purple' href='/beliefsearch'>dismantling a belief</a>, the <a class='color--purple' href='/loadedWordSearch'>loaded word database</a>, and <a class='color--purple' href='/insights'>premium insights</a> are currently free. </em></p>

      
     
     

     
        <Flex  justify='center' align='center' direction='column'>
       
           {/* subscriptipn box */}
           <Card mt=''>
          <Flex maxWidth='250px' mt='3' ml='2' direction='column'>
            <Heading>Subscription</Heading>
            <Text size='3'>Monthly</Text>
            <Text size='1'>Access to all premium cotent and discussion forums on site. Includes future releases of all content (including condition solutions).
            </Text>
            <Text size='6'><Strong>$6 / mo</Strong></Text>

            <Box>
              <IconButton color="teal" variant="soft">
                  <CheckCircledIcon width="18" height="18" /> 
                </IconButton> 
                <Text size='3' ml='2'>Access to all existing and new solutions that will be released
                </Text>
            </Box>
            <Box mt='5'>
              <IconButton color="teal" variant="soft">
                  <CheckCircledIcon width="18" height="18" /> 
                </IconButton> 
                <Text  size='3' ml='2'>Access to existing and soon to be released premium insights. 
                </Text>
            </Box>
            <Box mt='5'>
              <IconButton color="teal" variant="soft">
                  <CheckCircledIcon width="15" height="15" /> 
                </IconButton> 
                <Text size='3' ml='2'>Access to all community forums and the ability to send feedback directly to our experts. 
                </Text>
            </Box>
            <Button color='indigo' onClick={purchaseSubscription}>Purchase Subscription </Button>
           <Text size='2'><Em >Note: Access to premium content is lost when your subscription is no longer active. You'll have lifetime access to any  premium content you purchased individually (without subscription) even when a subscription ends. If you have any questions feel free to contact us <a href={`${process.env.REACT_APP_CONTACT_FORM}`}>here</a> and select "I have a question' as the subject.</Em></Text>      
          </Flex>
          </Card>
            {/* end of subscirpiton box */}
            <h4> OR</h4>

            <Button size='3' mb='2' highContrast onClick={purchaseCondition}>Direct purchase for lifetime access </Button>
        </Flex>
   
      
<Heading>Payment Issues?</Heading>
<Text>
If you have any issues making a payment please reach out to us at {`${process.env.REACT_APP_CLARITY_EMAIL}`}
</Text>
        {/* <Callout.Root highContrast mt='1'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text size='3'>
          If you have any issues making a payment please reach out to us at clarityapp1@gmail.com
          </Callout.Text>
  </Callout.Root>
         */}
      {/* <stripe-pricing-table disabled={true} pricing-table-id="prctbl_1Q7jjDBm8yO68FsgLPJOPObR"
publishable-key="pk_test_51Q5CkLBm8yO68FsgREoyysggMzs6sWfiHublue5zIf7SaaKMaTMagUtoU63dyfogwI4KTpJ2bh4NoAxhUO8r6ELN009BDY8NoS" customer-email={`${loggedInUser}`}>
</stripe-pricing-table>
       */}
     
      </Flex>
     }
      { (pageisLocked && loggedInUser==null) && <> 
{/* 
      {id==='674c931890d9df6b72e685ea' ? <p color='amber'>The How To Eliminate an Anxiety Trigger is free for a limited time to users with an account. You can create an account <a href='createaccount'>here</a> for free. To see free real-life examples of individuals using this book to eliminate anxiety triggers go <a href='/insights/673e12e3e73b19869f085c48'>here.</a></p>:     */}
      
          <Card mt='2'> <p><h4>Solution Preview:</h4> </p>
          <p>{conditionPreview ?  parse(`${conditionPreview}`): (!conditionName ? "This Solution doesn't exist.": "No Preview.")}</p>
          </Card>
   

         {conditionName ?  <div> <h5>Get full access</h5>
        <p>This premium content {`${accessRequired}`}. To get started create a <a class='color--blue' href='/createaccount'>free account</a>. With your free account you'll be able to view this content for free, get a subscription, or purchase it directly (~$2-10). </p>
      
    
         <p>
          Note: Subscriptions are ${`${process.env.REACT_APP_SUBSCRIPTION_PRICE}`} and give you access to all existing and soon-to-be-released premium solutions, content, and forums.  <em>Note: Solutions for <a class='color--blue' href='/beliefsearch'>dismantling a belief</a>, the <a class='color--blue' href='/loadedWordSearch'>loaded word database</a>, and <a class='color--blue' href='/insights'>premium insights</a> are currently free. </em></p>
         <Flex  justify='center' align='center'>
         <SubscriptionBox></SubscriptionBox>
         </Flex>
         { pageisLocked && <PaymentInfo></PaymentInfo>}
         </div>: <p></p>}
         </>

         
 }

     
  </div>
    
     
  );
}

export default ConditionPage;


// 
