import {  navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import DataContext from './context/DataContext';
import './Nav.css'
import $ from 'jquery';  // Import jQuery

import { isLoggedIn, logOut } from './api/userManagement';
import {Box, Button, Callout, DropdownMenu, Flex, Heading, Link, Strong, Text } from '@radix-ui/themes';
import { Cross1Icon, HamburgerMenuIcon, InfoCircledIcon } from "@radix-ui/react-icons"




const Nav = () => {
    const { search, setSearch, isUserLoggedIn,setIsUserLoggedIn, setLoggedInUser } = useContext(DataContext);
    let navigate = useNavigate();
    let location = useLocation();
    let currentPath = location.pathname
    const [showSmallMenu, setShowSmallMenu] = useState(false);

    const [isActive, setIsActive] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);
  const [menuWidth, setMenuWidth] = useState(null);



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

        $(window).on('scroll', function() {
            "use strict";
                        
            /*----------------------------------------------------*/
            /*	Navigtion Menu Scroll
            /*----------------------------------------------------*/	
            
            var b = $(window).scrollTop();
            
            if( b > 80 ){		
                $(".wsmainfull").addClass("scroll");
            } else {
                $(".wsmainfull").removeClass("scroll");
            }				
    
        });
    
        
       
        console.log('window ref' + window.location.pathname)

        // jquery
     

    // Wrap body with a div
    $('body').wrapInner('<div class="wsmenucontainer" />');
    // $('<div class="overlapblackbg"></div>').prependTo('.wsmenu');

    // Handle window resize for menu height and width
    const handleResize = () => {
      if ($(window).outerWidth() < 992) {
        setMenuHeight($(window).height());
        setMenuWidth($(window).width());
      } else {
        setMenuHeight(null);
        setMenuWidth(null);
        $('body').removeClass("wsactive");
        $('.wsmenu > .wsmenu-list > li > .wsmegamenu, .wsmenu > .wsmenu-list > li > ul.sub-menu').removeAttr("style");
        $('.wsmenu-click').removeClass("ws-activearrow");
        $('.wsmenu-click02 > i').removeClass("wsmenu-rotate");
      }
    };

    // Listen to window resize
    $(window).on('resize', handleResize);

    // Trigger resize manually for initial setup
    handleResize();

    // Cleanup on component unmount
    return () => {
      $(window).off('resize', handleResize);
    };
        // jquery end
      
      
        // const cleanUp = () => {
        //     // isMounted = false;
        //     // controller.abort()
        //     console.log('cleanup called')
        //     // source.cancel();
        // }
      
        // return cleanUp;
      },[isUserLoggedIn]);

      // Handle toggle of wsactive class
  const handleMenuToggle = () => {
    setIsActive(!isActive);
    $('body').toggleClass('wsactive');
  };

  // Handle click on overlap background to close menu
  const handleCloseMenu = () => {
    console.log('not firing close when outside menu click?')
    $('body').removeClass('wsactive');
  };

  // Handle submenu toggles
  const handleSubMenuToggle = (e) => {
    $(e.target).toggleClass('ws-activearrow')
      .parent().siblings().children().removeClass('ws-activearrow');
    $(".wsmenu > .wsmenu-list > li > .sub-menu, .wsmegamenu")
      .not($(e.target).siblings('.wsmenu > .wsmenu-list > li > .sub-menu, .wsmegamenu'))
      .slideUp('slow');
    $(e.target).siblings('.sub-menu').slideToggle('slow');
    $(e.target).siblings('.wsmegamenu').slideToggle('slow');
  };

  // Handle second level submenu toggle
  const handleSubMenuToggle02 = (e) => {
    $(e.target).children('.wsmenu-arrow').toggleClass('wsmenu-rotate');
    $(e.target).siblings('li > .sub-menu').slideToggle('slow');
  };


      function showSmallMenuFunction(e)
      {
        showSmallMenu ?  setShowSmallMenu(false):  setShowSmallMenu(true)
       
      }

     
    return (

      <>

        


        <div id="page" class="page ">
            
            {/* <p class=''>Our work is based on the finding that how we feel and behave is based on how we think. That negative emotions (like physical anxiety) and behaviors we’d like to change or eliminate are caused by our thinking and beliefs. To see this for yourself you can go here. </p> */}



                 

			<header id="header" class={ window.location.pathname=='/'|| window.location.pathname.toLowerCase() ==='/appnavigate' || window.location.pathname=='/therapists' || window.location=='/public'? "tra-menu navbar-light white-scroll":"tra-menu navbar-dark white-scroll" }>
            {/* <header id="header" class="tra-menu navbar-dark white-scroll"> */}
				<div class="header-wrapper ">
                    {/* <span class='test'>dsfsdfsdfsdfdfsdf</span> */}


					{/* <!-- MOBILE HEADER --> */}
				    <div class="wsmobileheader clearfix">	  	
				    	<span class="smllogo">
				    		<a href="/appnavigate">
					    		<img  style={{"width": "124.77.px", "height":" 31.99px", "z-index": "1000"}} src="/images/logo.png" alt="mobile-logo"/>
					    	</a>
				    	</span>
				    	<a id="wsnavtoggle" onClick={handleMenuToggle} style={{ "z-index": ""}}  class="wsanimated-arrow"><span></span></a>	
				 	</div>

				 	{/* <!-- NAVIGATION MENU --> */}
				  	<div class="wsmainfull menu clearfix">
                       
	    				<div class="wsmainwp clearfix">


	    					{/* <!-- HEADER BLACK LOGO --> */}
	    					<div class="desktoplogo">
	    						<a href="/appnavigate" class="logo-black">
	    							<img src="/images/logo.png" alt="logo"/>
	    						</a>
	    					</div>


	    					{/* <!-- HEADER WHITE LOGO --> */}
	    					<div class="desktoplogo">
	    						<a href="/appNavigate" class="logo-white"><img src="images/logo-white.png" alt="logo"/></a>
	    					</div>


							{/* <!-- MAIN MENU --> */}
                            {/* <div class='fullCalloutEvidence' style={{"display": "flex", "width": "80%"}}>
                            <p class='fullCalloutColoring' style={{"display": "inline-block", "height":''}}>  <InfoCircledIcon style={{"margin-bottom": "2.8px"}}/> Evidence of why our content works can be found <a class='text-danger hover--tra-theme' href='/insights/677abd2c34bcee92913561a6'>here</a>.</p>
                            </div> */}
                          
	<nav class="wsmenu clearfix">
            <div className="overlapblackbg" onClick={handleCloseMenu}></div>

        
		<ul class="wsmenu-list nav-theme">


           {/* megamenu #1*/}
           <li aria-haspopup="true" class="mg_link"><span class="wsmenu-click" onClick={handleSubMenuToggle}><i class="wsmenu-arrow"></i></span><a href="#" class="h-link">Solutions <span class="wsarrow"></span></a>
	            						<div class="wsmegamenu w-75 clearfix shiftMegamenueLeft">
	             							<div class="container">
	               								<div class="row">

	               									{/* <!-- MEGAMENU LINKS --> */}
                                                       {/* <li class=""><a >About Us</a></li>  */}
                                                       {/* <h6 class="">Conditions We Treat</h6> */}
	               									<ul class="col-md-12 col-lg-3 link-list">
                                                       {/* <p class="">Conditions We Treat</p> */}
                                                       {/* <li><a href="#"> </a></li> */}
                                                       <li class="h-link"><a href='/conditions'><h5>Conditions We Treat</h5></a></li>

									                    <li><a href="#">Sample </a></li>
									                    <li><a href="#">Sample</a></li>
									                    <li><a href="#">Sample</a></li>
									                    <li><a href="#">Sample</a></li>
                                                        <li><a href="#">Sample</a></li>
                                                        <li><a href="#">Sample</a></li>
                                                       		     
									                </ul>

									                {/* <!-- MEGAMENU LINKS --> */}
                                                    

	               									<ul class="col-md-12 col-lg-3 link-list">
                                                       <li class="h-link"><a><h5>Other Solutions</h5></a></li>
                                                       <li aria-haspopup="" class=""><a href="/beliefsearch">Dismantle a Belief</a></li>

                                                       <li aria-haspopup="true" class="h-link"><a href="/insights/677d58ee34bcee92913561ab">Get Therapy</a></li>
				  {/* <li aria-haspopup="true" class="h-link"><a href="/loadedwordsearch">Break free from worldy constructs</a></li> */}
				  <li aria-haspopup="true" class="h-link"><a href="/insights">Blog - Insights to Improve Your Thinking</a></li>
				  {/* <li aria-haspopup="true" class="h-link"><a href="/insights/6784286aa432901a3a981463">Find your purpose</a></li>	 */}
				  {/* <li aria-haspopup="true" class="h-link"><a href="our-view.html">Our View of the Mental Health Industry</a></li>	 */}
									                </ul>

									              
									             
                
								                </div>  
                                                {/* <!-- End row -->	 */}
								            </div> 
                                             {/* <!-- End container -->	 */}
								        </div> 
                                         {/* <!-- End wsmegamenu -->	 */}
								    </li>
          {/* end emgamenu */}


           {/* megamenu #2 */}
          <li aria-haspopup="true" class="mg_link"><span class="wsmenu-click" onClick={handleSubMenuToggle}><i class="wsmenu-arrow"></i></span><a href="#" class="h-link">About <span class="wsarrow"></span></a>
	            						<div class="wsmegamenu w-75 clearfix">
	             							<div class="container">
	               								<div class="row">

	               									{/* <!-- MEGAMENU LINKS --> */}
                                                    <ul class="col-md-12 col-lg-3 link-list">
                                                    <li class="h-link"><a><h5>About</h5></a></li>


                                                            <li class="fst-li"><a href="/overview.html">What Clarity(the platform) is</a></li> 
                                                            <li><a href="/why-it-works.html">Why What we do Works</a></li>
                                                            <li><a href="/about.html">Our Mission & Vision</a></li>

                                                        </ul>

									                {/* <!-- MEGAMENU LINKS --> */}
                                                    
	               									

									                {/* <!-- MEGAMENU LINKS --> */}
	               									<ul class="col-md-12 col-lg-3 link-list">
                                                       <li class="h-link"><a><h5>For Therapists</h5></a></li>

									                    <li class="fst-li"><a href="/therapists">How we help</a></li> 
									                    
									                    {/* <li><a href="faqs.html">FAQs Page</a></li>
									                    <li><a href="blog-listing.html">Blog Listing</a></li>
									                    <li><a href="single-post.html.html">Single Blog Post</a></li>		         */}
									                </ul>
                                                    <ul class="col-md-12 col-lg-3 link-list">
                                                       <li class="h-link"><a><h5>For Christians</h5></a></li>

									                    <li class="fst-li"><a href="/for-christians.html">How we help</a></li> 
									                    
									                    {/* <li><a href="faqs.html">FAQs Page</a></li>
									                    <li><a href="blog-listing.html">Blog Listing</a></li>
									                    <li><a href="single-post.html.html">Single Blog Post</a></li>		         */}
									                </ul>

                                                     {/* <!-- MEGAMENU LINKS --> */}
	               									<ul class="col-md-12 col-lg-3 link-list">
                                                       <li class="h-link"><a><h5>Partner with Us</h5></a></li>

									                    <li class="fst-li"><a href="/sponsorship.html">Become a Corporate Partner</a></li> 
									                    <li><a href="https://forms.gle/FMMnw6axLh6cvegJ7">Make Money </a></li>
									                    {/* <li><a href="faqs.html">FAQs Page</a></li>
									                    <li><a href="blog-listing.html">Blog Listing</a></li>
									                    <li><a href="single-post.html.html">Single Blog Post</a></li>		         */}
									                </ul>

	               							
                
								                </div>  
                                                {/* <!-- End row -->	 */}
								            </div> 
                                             {/* <!-- End container -->	 */}
								        </div> 
                                         {/* <!-- End wsmegamenu -->	 */}
								    </li>
          {/* end emgamenu */}
   
          
      


			
            {/* <li class="nl-simple mobile-last-link" aria-haspopup="true">
				<a href="/appnavigate" class="btn r-10 btn--theme last-link">Start Here</a>

			</li>  */}
            {/* <!-- SIMPLE NAVIGATION LINK --> */}
							    	<li class="nl-simple" aria-haspopup="true">
							    		<a href="/contact-us.html" class="h-link">Contact</a>
							    	</li>

            {/* <!-- SIMPLE NAVIGATION LINK --> */}
			<li class="h-link" aria-haspopup="true">
                {isUserLoggedIn &&  <a class="h-link" href='/accountDetails'>Account Details</a> }
                {/* {isUserLoggedIn ? <a className="hideLink" href='#' onClick={logoutUser}>Logout</a>: <a className="hideLink" onClick={()=> navigate('/login', {state: {pathCameFrom: location.pathname}})} href='' to="">Login/Create Free Account</a>} */}

				{/* <a href="login" class="h-link">Create an Account/Login</a> */}
			</li>



			<li class="h-link" aria-haspopup="true">
				{/* <a href="/appnavigate" class="btn r-10 btn--theme last-link">Get started</a> */}
                {isUserLoggedIn ? <a className="h-link" href='#' onClick={logoutUser}>Logout</a>: <a className="h-link" onClick={()=> navigate('/login', {state: {pathCameFrom: location.pathname}})} href='' to="">Login/Create Free Account</a>}

			</li> 
            <li aria-haspopup="">
            <a href="/insights/677abd2c34bcee92913561a6" class="btn r-10 btn--black last-link">Evidence of our work</a>		 
		    </li> 

            {/* <!-- SIMPLE NAVIGATION LINK --> */}
			 <li class="nl-simple" aria-haspopup="">
				<a href="/appnavigate" class="btn btn--theme text-info hover--theme " >Start Here</a>
			</li> 
           


		</ul>
        
	</nav>
    {/* <div className="overlapblackbg" onClick={handleCloseMenu}></div> */}
    {/* <div className="wsmenucontainer" style={{ minWidth: menuWidth, height: menuHeight }}></div> */}


    	{/* <!-- END MAIN MENU --> */}


	    				</div>
	    			</div>	
                    {/* <!-- END NAVIGATION MENU --> */}


				</div>     
                {/* <!-- End header-wrapper --> */}
			</header>	
            {/* <!-- END HEADER --> */}
      

    </div>
    </>

    
    )
}

export default Nav


{/* <ul>
                  
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul> */}