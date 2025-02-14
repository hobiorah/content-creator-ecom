import React from 'react'
import parse from 'html-react-parser';
import { Strong, Flex, Text, Button, Card, Box, Heading } from '@radix-ui/themes';


const InsightCard = ({insight}) => {

    // const createConditionsString = () =>{

    //     let test ='';
    //     conditions.forEach((conditionObject,i) =>
    //         {
    //           test += conditionObject.condition;
    //           if (i +1 !== conditions.length) test += ', ';
    //       })
    //       console.log('condition string')
    //       console.log(test);
    //       return test
    //    };
      
  return (
    
<Box maxWidth="400px">
    <Card variant='classic' size='3'>
      <Flex direction="column" gap="1" align="">
        {/* <Box> */}
          <Heading mb="" as="h2" >
          {insight.insightTitle}
          </Heading>
          {insight.tags && <Text as="p"  mt="" color="gray" ><Strong>Tags: </Strong><em>{insight.tags.join()}</em> 
          </Text> 
          }
           {insight.insight ? <Text as="p" mt="1" weight="medium">Excerpt of the insight: </Text>:  ''}
           {insight.insight ?   parse(insight.insight.substring(0,500)) :  ''}
             <Button mt="1" color="gray" variant="soft" style={{'align-self': 'center'}} >Click for more</Button>   
      </Flex>
    </Card>
  </Box>
    
//   <div className="card">
//     <div className="card-details">
//         <p className="text-title">{insight.insightTitle}</p>
//         <p className="text-body">{insight.tags ? `Tags: ${insight.tags}`: ''}</p>
//         <p className="text-body">{insight.insight ? parse(insight.insight.substring(0,100)): ''}</p>
//     </div>
//     <button className="card-button">More info</button>
// </div>
  )
}

export default InsightCard

