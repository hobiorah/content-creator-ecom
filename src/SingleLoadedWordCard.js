import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import { fetchData } from './api/fetchData';
import parse from 'html-react-parser';

import { Flex, Text, Button, Card, Box, Heading, Avatar, Callout } from '@radix-ui/themes';


function SingleLoadedWordCard({loadedWord, why, examples}) {
  const {loadedWordList } = useContext(DataContext);

    
    // console.log(string);  
  
  return (
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
 

   
<div class="col">
  {/* <Box maxWidth=""> */}

<div class="fbox-6 fb-4 wow animate__animated animate__fadeInUp ">
  <Card variant='classic' size='3'>
    <Flex direction="column" gap="" align="">
        <h4 mb="" as="h1" >
        {loadedWord}
        </h4>
        <h5>Why its a loaded word: </h5>
        {why && <Text as=""  mt="" color="gray" >  {parse(why.substring(0,1000))} </Text> }
           <Button mt="2" color="gray" variant="soft" style={{'align-self': 'center'}} >Click for more</Button>   
    </Flex>
  </Card>
  </div>
</div>

// {/* <Box maxWidth=""> */}

  //  <div className='beliefCard'>
  //   <h1>{loadedWord} </h1>
  //   <h2>Why its a loaded word: </h2>
  //    <p>{why}</p>
  //   <h3>Examples if exist</h3> 
  //     <p> {examples} substring 100 characters...</p>
  //  </div>
     
  );
}

export default SingleLoadedWordCard;



