import React from 'react'
import { Flex, Button, AlertDialog, Text, Heading, Em, Strong } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const PaymentInfo = () => {
  return (
    <>
        <Text color='red' highContrast size='3'><Strong >To  receive notifications whenever we update or release new content just create a free <Link to="/createAccount" >account</Link>.</Strong></Text>
        <Heading mt='2'>What you get when you make a subscription or direct purchase </Heading> 
        <em>Limited time offer: Users who make a direct purchase of a solution will have access to experts and the solution's community group. Forums are usually only accessible to users with subscriptions. </em>
        <Text>
            <ul class="simple-list">
                <li>Access to this solution plus access to future enhancements driven by community recommendation and new research findings. 
            </li>
            <li>Access to the community group for this solution which lets you submit questions and help requests to our experts. </li>
           
                    
            </ul>
       {/* <Em>Note: Access to a solution is lost when your subscription is no longer active. If you purchased a solution before buying a subscription, you’ll have access to the solution for a lifetime even after a subcription ends. </Em> */}
       </Text>
        <Heading mt='2' size='3'>Benefits you can expect:</Heading>
        <Text>More inner confidence, less physical anxiety, more inner peace, increased clarity of purpose, more self-trust, and an increase in self-awareness.
        </Text>
        <Heading size='3' mt='2'>Access to experts</Heading>
        <Text>If you think a solution needs more clarification or improvements you can create a post  and share what you’d like us and the community to know. We regularly review communities. You can also submit a dedicated ‘solution feedback’ request that is only available to those that have purchased a solution or have a subscription.  
        </Text>
       
        <Heading mt='2' size='3'>What is a community group?</Heading>
        <Text>A forum(think reddit) for the solution you purchased. You can ask and answer questions, share lessons learned, etc with others working on the same or similar psychological problem as you. Forums will monitored by our experts so we can provide input when necessary. <Em>If there isn't a lot of activity in the forum and you post questions expect priority support from our experts.</Em>
        </Text>

        

        <Heading mt='2' size='3'>Can't pay?</Heading>
        <Text>If you are unable to pay full price at the moment let us know your situation and we can work something out. Fill out this <a href='https://forms.gle/TpjZQNu7H2LLTqCY6'>form</a> and select "scholarship" in the subject box and tell us your situation. </Text>
    </>
  )
}

export default PaymentInfo