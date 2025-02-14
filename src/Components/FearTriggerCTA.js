import React from 'react'
import parse from 'html-react-parser';
import { Strong, Flex, Text, Button, Card, Box, Heading, Link, Em, Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';


const FearTriggerCTA = () => {

      
  return (
    
<Box maxWidth="">
  <Text>------</Text>
  <br></br>
    <Em>We want to make it known that it may take time before you're able to be ok with whatever you need to be ok with to eliminate a trigger/fear. We recommend you <a href='/insights/6713bd7733710599b813af68'>grant yourself grace</a> as you work to transform yourself during your journey. </Em>
    <Heading mt='2'><Strong>Recommended reads</Strong></Heading>
    <ul class="simple-list color--blue " >

  
    <li class="list-item"><a highContrast href="https://medium.com/@theclarityapp/unpacking-the-science-the-psychological-root-cause-of-anxiety-be1efa46d07b">What is the root cause of anxiety?</a></li>
    {/* <li><Link href="">Is anxiety actualyl helpful or necessary?</Link></li> */}
    {/* <li><Link href="">Common psychological solutions for eliminating a trigger/fear</Link></li> */}

    <li><a href="/condition/674c931890d9df6b72e685ea">How to reprogram your brain and eliminate an anxiety trigger</a></li>
    
    <li><Text><a href="/insights/673cd893e73b19869f085c46">The Anxiety Paradox: Why and how we unkowingly program ourselves to be anxious.</a></Text></li>
    
    {/* <li><Text>To take a closer look at why anxiety appears to be helpful but often isn’t beneficial in the long run read this.(is anxiety helpful on wordpress)</Text>   </li> */}

    <li><Text><a href="/insights/67585d0432be4cf7401217fa">How to get what we want in life.</a></Text></li>
    <li><Text><a href="/insights/67585eb632be4cf7401217fb">How to stop caring what people think: What other people say isn't always right.</a></Text></li>

    <li><a href='/insights/673e12e3e73b19869f085c48'>Real-life examples for how to uncover and eliminate an anxiety trigger/fear.</a></li>

    <li><Text>To take a closer look at why anxiety appears to be helpful but often isn’t beneficial in the long run read this(coming soon).</Text>   </li>
    </ul>

    <Callout.Root mt='2' mb='2' highContrast color ='gold' variant="surface">
		<Callout.Icon>
			<InfoCircledIcon />
		</Callout.Icon>
		<Callout.Text m='0'>
			If you struggle with low self-esteem, self-consciousness, low self-worth, feeling inadequate or not good enough, we encourage you to scroll through <a class='color--blue' href='/conditions'>this</a> page to see our solutions to these and other challenges. <br></br><br></br>A 6$ Clarity <a class='color--blue' href='/subscription'>subscription</a> grants you access to every solution and forum on Clarity.
		</Callout.Text>
	</Callout.Root>
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

export default FearTriggerCTA

