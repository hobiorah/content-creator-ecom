import {  navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from './context/DataContext';
import './Nav.css'
import { isLoggedIn, logOut } from './api/userManagement';
import {Box, Button, DropdownMenu, Flex, Heading, Link, Strong, Text } from '@radix-ui/themes';
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"




const Nav = () => {
    const { search, setSearch, isUserLoggedIn,setIsUserLoggedIn, setLoggedInUser } = useContext(DataContext);
    let navigate = useNavigate();
    let location = useLocation();
    let currentPath = location.pathname
    const [showSmallMenu, setShowSmallMenu] = useState(false);



    async function logoutUser()
    {
        let result  = await logOut();

        
       

        if(result?.response?.status >=200)
            {
                setIsUserLoggedIn(false)
                setLoggedInUser('')
            } else {
              console.log('logout error')
            }
    }

    useEffect(() =>{

       
        
      
      
        const cleanUp = () => {
            // isMounted = false;
            // controller.abort()
            console.log('cleanup called')
            // source.cancel();
        }
      
        return cleanUp;
      },[isUserLoggedIn]);

      function showSmallMenuFunction(e)
      {
        showSmallMenu ?  setShowSmallMenu(false):  setShowSmallMenu(true)
       
      }
    return (
        <>
        <nav className="bigNavbar">
          
            
                  {/* links render to anchor text but tell react not to pull react from server but route to proper component. 
                leverages the router we created in parent app */}
        <Flex align='center' wrap='true'>
        <a className='navLinks' href="/apphome"><Heading >Clarity</Heading></a>
        <Text size='1' className='navLinks'>the app(beta)</Text>
        <a className="navLinks"  href='/apphome' to="/">  <Text size='3' ml='4' mr='1' color='white' variant="strong">
        <Strong>Home</Strong></Text></a>
      
            <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <Text size='3' ml='4' mr='2' color='white' variant="strong">
                        <Strong>Conditions we have solutions for</Strong>
                        <DropdownMenu.TriggerIcon />
                    </Text >
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size='2'>
            {/* <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>The conditions</DropdownMenu.SubTrigger> */}
                {/* <DropdownMenu.Content> */}
                    <DropdownMenu.Item shortcut=""><Link size='5' underline='none' highContrast href='/condition/66df6fd0e95bed6217424ab1'>Social Anxiety</Link> </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/66e3668ba96aaf6c3fba5412'>Low Self-Esteem</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/674c931890d9df6b72e685ea'>Learn how to Eliminate Anxiety Triggers</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/66e36942a96aaf6c3fba5413'>Low Self-Worth</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/66e45a353deb0fa5b8afb45b'>Self-Consciousness</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/66e44a783deb0fa5b8afb45a'>Low Self-Confidence</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/condition/66e2fd32a96aaf6c3fba5410'>Feeling Inadequate</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5' underline='none' highContrast href='/condition/66e303c4a96aaf6c3fba5411'>Not feeling good enough</Link></DropdownMenu.Item>
                </DropdownMenu.Content>
		{/* </DropdownMenu.Sub> */}
        {/* <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Our other solutions</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                    <DropdownMenu.Item shortcut=""><Link underline='none' highContrast href='/beliefSearch'>Dismantle a limiting belief</Link> </DropdownMenu.Item>
                    <DropdownMenu.Item shortcut=""><Link underline='none' highContrast href='/insights'>Peace/clarity providing insights</Link></DropdownMenu.Item>
                    <DropdownMenu.Item shortcut=""><Link underline='none' highContrast href='/loadedWordSearch'>Break free from a loaded term</Link></DropdownMenu.Item>
                </DropdownMenu.SubContent>
		</DropdownMenu.Sub> */}

                   

                {/* </DropdownMenu.Content> */}
            </DropdownMenu.Root>

           

        {/* Other solutions component */}

        <DropdownMenu.Root>

            <DropdownMenu.Trigger>
                <Text size='3' ml='2' color='white' variant="">
                    <Strong>Our other solutions</Strong>
                    <DropdownMenu.TriggerIcon />
                </Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size='3'>
                <DropdownMenu.Item shortcut=""><Link underline='none' size='5'  highContrast href='/beliefSearch'>Dismantle a limiting belief</Link> 
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5' underline='none' highContrast href='/insights'>Peace/clarity providing insights</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='/loadedWordSearch'>Break free from a loaded term</Link></DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut=""><Link size='5'  underline='none' highContrast href='https://forms.gle/J2TDxqpbFCbn5uXv5'>Get 1on1 help</Link></DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        </Flex>

       
          

           
        <Flex align='center' wrap='true'>
            <a className='navLinks' href='/contact-us.html'><Text size='3' mr='3' ml='2' color='white' ><Strong>Contact Us</Strong></Text></a>

            
        <DropdownMenu.Root>

            <DropdownMenu.Trigger>
                <Text size='3' ml='2' mr='2' color='white' variant="">
                    <Strong>About</Strong>
                    <DropdownMenu.TriggerIcon />
                </Text>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size='2'>
              
                        <DropdownMenu.Item shortcut="">
                        <Link underline='none' highContrast className='' href='/overview.html'><Text size='3' mr='3' color='black' ><Strong>What Clarity (the platform) is</Strong></Text></Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut="">
                        <Link underline='none' highContrast className='' href='/why-it-works.html'><Text size='3' mr='3' color='black' ><Strong>Why What We Do Works</Strong></Text></Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut="">
                        <Link className='' highContrast href='https://forms.gle/FMMnw6axLh6cvegJ7'><Text size='3' mr='3' color='black' ><Strong>Make Money w/ us</Strong></Text></Link>
                            </DropdownMenu.Item>
            </DropdownMenu.Content>
    </DropdownMenu.Root>
            {/* <a className='navLinks' href='/overview.html'><Text size='3' mr='3' color='white' ><Strong>About</Strong></Text></a> */}

                {isUserLoggedIn && <a href='/accountDetails'><Button size='3' color='white'>Account Details</Button></a>}
                {/* what if ookies expire but neer leaves broswer/page */}
                {isUserLoggedIn ? <a  href='#' onClick={logoutUser}><Button size ='3'variant="surface">Logout</Button></a>: <a className="" onClick={()=> navigate('/login', {state: {pathCameFrom: location.pathname}})} href='' to=""><Button size='3' variant="surface" >Login/Create Free Account</Button></a>}
                

            {/* {isUserLoggedIn && <a  href='#' onClick={logoutUser}>Logout</a>}
            {!isUserLoggedIn && <a className="" onClick={()=> navigate('/login')} href='' to="">Login</a>} */}
            </Flex>
            

                
        </nav>

        <nav className='smallNav'>
        
        <Flex direction='row'>
        <a className='navLinks' href="/"><Heading >Clarity</Heading></a>
        <Text size='1' className='navLinks'>the app (beta)</Text> 
        </Flex>
            
            
          
            <HamburgerMenuIcon  onClick={showSmallMenuFunction} width='40px' height='40px'/>

        </nav>

        {showSmallMenu && <Flex className='smallNavMenu' direction='column' align='center' gap='2'>
            <Cross1Icon onClick={showSmallMenuFunction} justify-self='end' width='40px' height='40px'></Cross1Icon>
            <a className="hideLink" href='/apphome' to="/">Home</a>
            <a className="hideLink" href='/contact-us.html' to="/">Contact Us</a>
            <a className="hideLink" href='/overview.html' >About</a>
            <a className="hideLink" href='/conditions' >Conditions We Have Solutions For</a>
            <a className="hideLink" href='/' >Our Other Solutions</a>
            <a className="hideLink" href='https://forms.gle/FMMnw6axLh6cvegJ7' >Make Money w/ Us - Become an Affliate</a>
            {isUserLoggedIn &&  <a href='/accountDetails'>Account Details</a> }
            {isUserLoggedIn ? <a className="hideLink" href='#' onClick={logoutUser}>Logout</a>: <a className="hideLink" onClick={()=> navigate('/login', {state: {pathCameFrom: location.pathname}})} href='' to="">Login/Create Free Account</a>}


        </Flex>}

    </>
    )
}

export default Nav


{/* <ul>
                  
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul> */}