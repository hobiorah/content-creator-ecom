import logo from '../logo.svg';
import '../App.css';
import parse from 'html-react-parser';
import { Flex, Text, Button, Card, Box, Heading } from '@radix-ui/themes';
import { InfoCircledIcon, LockClosedIcon } from '@radix-ui/react-icons'




function searchForBelief(belief) {
  //move to belief list page; iterate through all beleifs and generate a single beleif component for each matching belief
  //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
}
function SingleConditionCard({showLock, condition, ourDefinition, thirdPartyDefinition, conditionId, hasAcess, preview}) {
    
    //console.log(parse(ourDefinition));  
   console.log(showLock, condition)
  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
 

   
  //  <div className='beliefCard'>
  //   <h1>{condition} </h1>
  //   {/* <h2>Our Definition </h2> */}
  //    {ourDefinition && parse(ourDefinition)}
  //    {/* <h2>Definition from {thirdPartyDefinition.sourceName} </h2>
  //    <p>{thirdPartyDefinition.definition}</p>
  //   <h3>Dismantle of the belief:</h3> 
  //     <p>substring 100 characters...</p>
  //     <Link>Link to definition from 3rd party:</Link> */}
  //     {/* make request to get beliefs */}
  //  </div>

// <Box maxWidth="400px" maxHeight=''>
// <Card variant='classic' size='3'>
//   <Flex direction="column" gap="" align="">
//    <>{showLock &&  <LockClosedIcon/>}</>
//       <Heading mb="" as="h1" >
//       {condition}
//       </Heading>
//       {preview && <Heading size='2'>Solution Preview: </Heading>}
//       {preview && <Text as=""  mt="" color="gray" >  {parse(preview.substring(0,2000))} </Text> }
//       <Button mt="2" color="gray" variant="soft" style={{'align-self': 'center'}} >Click for the full solution</Button>
//   </Flex>
// </Card>
// </Box>

<div class="col">
<div class="fbox-6 fb-4 wow animate__animated animate__fadeInUp animate__delay-3">

   
<Card variant='classic' size='3'>

   {/* <!-- Text --> */}
   <div class="fbox-txt">
   <>{showLock.boolean &&  <div><LockClosedIcon/>{showLock.accessRequired} </div> }</>
       <h6 class="h6-xl"> {condition}</h6>
       {preview && <h7 size=''><strong>Solution Preview: </strong></h7>}
       {preview && <p as=""  mt="" color="gray" >  {parse(preview.substring(0,2000))} </p> }


       <a style={{'margin-right': '5px'}} class="btn mt-1  btn-md r-36 btn--black " onClick={() =>
{
// insertEvent('click',{'button':'loaded words',"objectName":`loadedwords`})

}}>Click for the full solution</a> 
   </div>
   </Card>

</div>
</div>
     
  );
}

export default SingleConditionCard;

