import React from 'react'
import { Flex, Button, AlertDialog, Text, Heading, Em, Checkbox, IconButton, Box, Strong, Card, HoverCard, Callout, Switch } from '@radix-ui/themes';
import { CheckCircledIcon, InfoCircledIcon, Link2Icon } from '@radix-ui/react-icons';
import { useState, useEffect, useContext } from "react";
import {purchaseSubscription} from '../util/subscriptionUtil'

import DataContext from '../context/DataContext';
export const SubscriptionBox = () => {
  const { loggedInUser } = useContext(DataContext);

  return (
    <Card ml='2'>
    <Flex maxWidth='250px' mt='3' ml='2' direction='column'>
      <Heading>Subscription Benefits</Heading>
      <Text size='3'>Monthly</Text>
      <Text size='1'>Access to all premium content and discussion forums on site. Includes all future prescription and content releases.
      </Text>
      <Text size='6'><Strong>${`${process.env.REACT_APP_SUBSCRIPTION_PRICE}`} / mo</Strong></Text>

      <Box>
        <IconButton color="teal" variant="soft">
            <CheckCircledIcon width="18" height="18" /> 
          </IconButton> 
          <Text size='3' ml='2'>Access to all existing and new solutions that will be released.
          </Text>
      </Box>
      <Box>
        <IconButton color="teal" variant="soft">
            <CheckCircledIcon width="18" height="18" /> 
          </IconButton> 
          <Text size='3' ml='2'>Access to the analysis of our free real-life how to find a root cause <a href='/insights/673e12e3e73b19869f085c48' class='color--purple'>examples</a>.
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
      {loggedInUser ?  <Button color='indigo' onClick={() => purchaseSubscription('none',loggedInUser)}>Purchase Subscription </Button>:
      <a href='/createaccount'>
      <Button size='3' color='indigo' >Create an account or login to get a subscription </Button>
        </a>}
      
     <Text size='2'><Em >Note: Access to premium content is lost when your subscription is no longer active. You'll have lifetime access to any  premium content you purchased individually (without subscription) even when a subscription ends. If you have any questions feel free to contact us <a href={`${process.env.REACT_APP_CONTACT_FORM}`}>here</a> and select "I have a question' as the subject.</Em></Text>      
    </Flex>
    </Card>
  )
}


export default SubscriptionBox
