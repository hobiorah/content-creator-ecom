import { Flex } from '@radix-ui/themes'
import React from 'react'
import SubscriptionBox from '../Components/SubscriptionBox'
import PaymentInfo from '../Components/PaymentInfo'
import { Link } from 'react-router-dom'

const SubscriptionDetails = () => {
  return (
    <div class='container'>
        

        <p>To access premium solutions you have to either have a <a href='/createaccount'>free account</a>, a subscription, or have purchased this solution directly.  <em>Note: Solutions for <a href='/beliefsearch'>dismantling a belief</a>, the <a href='/loadedWordSearch'>loaded word database</a>, and <a href='/insights'>premium insights</a> are currently free. </em></p>
    
         <p>
        
         Sales fund the creation of content and the operations of this site. Premium solutions are on average ~2$. You can also get a 6$ subscription which gives you access to all existing and soon-to-be-released premium solutions, content, and forums. To directly purchase a condition or get a subscription you must first <Link to="/createAccount" >create a free account.</Link> </p>

         <Flex  justify='center' align='center'>
         <SubscriptionBox></SubscriptionBox>
         </Flex>
         
 

       <PaymentInfo></PaymentInfo>

    </div>
  )
}

export default SubscriptionDetails