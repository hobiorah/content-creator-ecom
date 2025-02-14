import logo from './logo.svg';
import './App.css';
import './Cards.css'
import parse from 'html-react-parser';
import { Flex, Text, Button, Card, Box, Heading } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons'




function searchForBelief(belief) {
  //move to belief list page; iterate through all beleifs and generate a single beleif component for each matching belief
  //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
}
function SingleBeliefCard({belief, metaProblems, conditions, conditionsString, dismantling}) {
    
     //console.log(conditions);  
   //  let conditionsString = '';
     const createConditionsString = () =>{

      let test ='';
      conditions.forEach((conditionObject,i) =>
          {
            test += conditionObject.condition;
            if (i +1 !== conditions.length) test += ', ';
        })
        console.log('condition string')
        console.log(test);
        return test
     };
    
  
  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
 

   
  //  <div className='beliefCard'>
  //   <h1>{belief} </h1>
  //   {/* <h2>Problems belief can give rise to: </h2>
  //    <p>{metaProblems.join(", ")}</p> */}
  //   <h3>Dismantling of the belief:</h3> 
  //     <p>substring 100 characters...</p>
  //  </div>
  
  // const searchForBelief = async (belief) => {

 
  <Box maxWidth="400px">
    <Card variant='classic' size='3'>
      <Flex direction="column" gap="" align="">
        {/* <Box> */}
          <h5 mb="" as="h3" >
          {belief}
          </h5>
          {conditions && <Text as="p"  mt="" color="gray" >This belief is one of the root causes of: <em>{conditionsString}</em> 
          </Text> 
          }
           {dismantling ? <Text as="p" mt="1" weight="medium">Excerpt for how to dismantle this belief: </Text>:  ''}
           {dismantling ?   <p class='small'>{parse(dismantling.substring(0,400))}</p>:  ''}
             <a  class="btn btn-sm r-36 btn--black hover--black" mt="1" color="gray" variant="soft" style={{'align-self': 'center'}} >Click for the full solution (free)</a>   
      </Flex>
    </Card>
  </Box>

//   <div className="card">
//   <div className="card-details">
//     <p className="text-title">{belief}</p>
//     {conditions ? <p className="text-body">This belief is one of the root causes of: <em>{conditionsString}</em> </p> : <p> </p>}
//     {/* <p className="text-body">Dismantling of the belief excerpt: {dismantling ? parse(dismantling.substring(0,100)): ''}</p> */}
//     {dismantling ? 'Dismantling of the belief excerpt: ':  ''}
//     {dismantling ?   parse(dismantling.substring(0,100)):  ''}
  
//   </div>
//   <button className="card-button">More info</button>
// </div>

 
  );
}

export default SingleBeliefCard;



