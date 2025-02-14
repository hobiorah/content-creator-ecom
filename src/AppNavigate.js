import React from 'react'
import { insertEvent } from './util/trackingSiteBehavior'
import { Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'

const AppNavigate = () => {
  return (
    < div class='no margin' style={{'margin-top':'-95px'}}>
    {/* <!-- HERO */}
		
			<section id="hero-14" class="bg--fixed hero-section division ">
				<div class="container">	
					<div class="row justify-content-center  mt-0">


						{/* <!-- HERO TEXT --> */}
						<div class="col-md-8">
							<div class="hero-14-txt text-center color--white wow animate__animated animate__fadeInUp">

								{/* <!-- Title --> */}
								<h2>Unravel and Dismantle Your Beliefs <em class=''>without</em> Therapy</h2>

								{/* <!-- Text --> */}
								<p class="p-xl">All psychological problems are caused by  <a  href='/insights/677abd2c34bcee92913561a6'><span class='color--violet-red'>beliefs</span></a>. Everything we offer from our prescriptions to our standalone belief-dismantling solutions helps you uncover and dismantle limiting beliefs. 


{/* <Callout.Root color='purple' highContrast size="1">
                    
    <Callout.Icon>
        <InfoCircledIcon />
    </Callout.Icon>
      <p class='m-0 small'> Expect pyschological transformation immediately after consuming any of our solution.</p>
</Callout.Root>
*/}



<br></br><br></br>What we treat, our offerings and upcoming releases are below. </p> 
<p></p>    

								{/* <!-- STORE BADGES -->												 */}
								<div class="stores-badge badge-img-md">

									{/* <!-- AppStore --> */}
									<a href="#start" class="btn btn--theme mr-2">
                                        Conditions We Treat
										{/* <img class="appstore" src="images/store_badges/appstore.png" alt="appstore-badge"/> */}
									</a>
													
									{/* <!-- Google Play --> */}
									<a href="#start" class="btn btn--black">
                                        Other Offerings
										{/* <img class="googleplay" src="images/store_badges/googleplay.png" alt="googleplay-badge"/> */}
									</a> 
							
								</div>	
                                {/* <!-- END STORE BADGES -->	 */}

								{/* <!-- OS Prerequisite --> */}
								<div class="os-version-ext">
	

									<span class="os-version">Expect pyschological transformation immediately after consuming any of our solutions or prescriptions.</span>
								</div>
					
							</div>
						</div>	
                        {/* <!-- END HERO TEXT -->	 */}


					</div>   
                     {/* <!-- End row --> 	 */}
				</div>	   
                {/* <!-- End container -->  */}
			</section>	
            {/* <!-- END HERO -->	 */}
    <div class="container">

    
{/* 
    <!-- FEATURES WRAPPER -- */}
    <div class=" py-50 fbox-wrapper text-center">
        {/* <p>Note: We are constantly releasing new content. To be notified of new releases and updates sign up for free <a class="text-info hover--black" href="createaccount" >here.</a></p> */}

        <Callout.Root color='purple' highContrast size="1">

    <Callout.Icon>
        <InfoCircledIcon />
    </Callout.Icon>
      <p id='start' class='m- ' >Note: We are constantly releasing new content. To be notified of new releases and updates sign up for free <a class="text-info hover--black" href="createaccount" >here.</a></p>
</Callout.Root>

    <p class='mb-2 small'><br></br> <em>Every piece of content has a discussion forum where you can get feedback and ask questions.</em></p>
        <div class="row row-cols-2 row-cols-md-3">
            


            {/* <!-- FEATURE BOX #1 --> */}
             <div class="col">
                 <div class="fbox-6 fb-1 wow animate__animated animate__fadeInUp animate__delay-1">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/overcome-flag.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Overcome a Condition</h6>
                        <p></p>
                        {/* <a style={{'margin-right': '5px'}}href={``} class="btn  btn-md r-36 btn--tra-black hover--tra-black" onClick={() =>
          {
            insertEvent('click',{'button':'therapy',"objectName":`conditions`})
           
       }}>Get Therapy</a>  */}

<a href={`/conditions`} class="btn mt-1 r-36 btn--black btn-sm hover--tra-black" onClick={() =>
          {
            insertEvent('click',{'button':'/conditions'})
         
       }}>See our prescriptions</a> 
                    </div>

                 </div>
             </div>	
             {/* <!-- END FEATURE BOX #1 -->	 */}


             {/* <!-- FEATURE BOX #2 --> */}
             <div class="col">
                 <div class="fbox-6 fb-2 wow animate__animated animate__fadeInUp animate__delay-2">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/belief-word.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Dismantle a belief</h6>
                        <p>
                        </p>

                        <a style={{'margin-right': '5px'}}href={`/beliefsearch`} class="btn mt-1 btn-sm r-36 btn--black hover--tra-black" onClick={() =>
          {
            insertEvent('click',{'button':'dismantleBeliefs',"objectName":`beliefs`})
           
       }}>Dismantle a Belief</a> 
                    </div>

                 </div>
             </div>	
             {/* <!-- END FEATURE BOX #2 -->	 */}


             {/* <!-- FEATURE BOX #3 --> */}
             <div class="col">
                 <div class="fbox-6 fb-3 wow animate__animated animate__fadeInUp animate__delay-3">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/therapy.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Get hel</h6>
                        <p>Although we think we can help with almost anything, we focus on helping people understand and eliminate negative emotions and behaviors they want to change or get rid of.
                            <br>
                            </br>
                            The results are better performance at work and life.
                        </p>
                        <a style={{'margin-right': '5px'}}href={`/insights/677d58ee34bcee92913561ab`} class="btn mt-1  btn-sm r-36 btn--black hover--tra-black" onClick={() =>
          {
            insertEvent('click',{'button':'dismantle belief',"objectName":`beliefs`})
           
       }}>Learn More</a> 
                    </div>

                 </div>
             </div>
             	{/* <!-- END FEATURE BOX #3 -->	 */}

                 {/* <!-- FEATURE BOX #4 --> */}
             <div class="col">
                 <div class="fbox-6 fb-4 wow animate__animated animate__fadeInUp animate__delay-3">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/chains.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Break Free from Worldy Constructs</h6>
                        <p>write the subtitle here. 
                        </p>

                        <a style={{'margin-right': '5px'}} href='/loadedWordSearch' class="btn mt-1  btn-sm r-36 btn--black hover--tra-black" onClick={() =>
          {
            insertEvent('click',{'button':'loadedwords',"objectName":`loadedwords`})
           
       }}>Search for a loaded term</a> 
                    </div>

                 </div>
             </div>
             	{/* <!-- END FEATURE BOX #4 -->	 */}

                {/* <!-- FEATURE BOX #5 --> */}
             <div class="col">
                 <div class="fbox-6 fb-5 wow animate__animated animate__fadeInUp animate__delay-3">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/mentalgrowth.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Improve Your Thinking</h6>
                        <p>write the subtitle here. 
                        </p>
                        <a style={{'margin-right': '5px'}}href={`/insights`} class="btn mt-1 btn-sm r-36 btn--black hover--black" onClick={() =>
          {
            insertEvent('click',{'button':'insights',"objectName":`insights`})
           
       }}>Access Critical Insights</a> 
                    </div>
                    

                 </div>
             </div>
             	{/* <!-- END FEATURE BOX #5 -->	 */}

                 {/* <!-- FEATURE BOX #56 --> */}
             <div class="col">
                 <div class="fbox-6 fb-6 wow animate__animated animate__fadeInUp animate__delay-3">

                     {/* <!-- Image --> */}
                    <div class="fbox-img h-180">
                        <img class="img-fluid" src="images/dating.png" alt="feature-image"/>
                    </div>

                    {/* <!-- Text --> */}
                    <div class="fbox-txt">
                        <h6 class="h6-xl">Header</h6>
                        <p>write the subtitle here. 
                        </p>
                        <a style={{'margin-right': '5px'}}href={`/insights/6782bb25a432901a3a981462`} class="btn mt-1 btn-sm r-36 btn--black hover--black" onClick={() =>
          {
            insertEvent('click',{'button':'therapy',"objectName":`datingHelp`})
           
       }}>Get Dating Help</a> 
                    </div>
                    

                 </div>
             </div>
             	{/* <!-- END FEATURE BOX #5 -->	 */}


                
        </div>  
        {/* <!-- End row -->   */}
    </div>	
    {/* <!-- END FEATURES WRAPPER --> */}

    <h3 class=" text-center mt-3" >Coming Soon </h3>	
    <p><strong>Prescriptions for</strong>:</p>
    <ul class="simple-list">

									<li class="list-item">
										<p>
                                        Coming soon 1  
										</p>
									</li>
                                    <li class="list-item">
										<p>
                                        Coming soon 2
										</p>
									</li>
                                    <li class="list-item">
										<p>
                                            Coming soon 3 
                                        </p>
									</li>
                                  

	</ul>
    <p><strong>New Content:</strong> </p>
    <ul class="simple-list">

									<li class="list-item">
										<p>
                                        More <a class="text-info hover--black" href="/insights/673e12e3e73b19869f085c48">real-life examples</a>  of how to uncover and eliminate a physical anxiety trigger.
										</p>
									</li>

	</ul>
								
								<br></br>
								<p></p>


</div>  




</div>


        
  )
}

export default AppNavigate