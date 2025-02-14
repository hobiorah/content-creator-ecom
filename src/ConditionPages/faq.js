 {/* FAQ component */}
 <section id="preview" class="py-10 mb-3 faqs-3 faqs-section division">				
 <div class="container">
     <div class="row">
{/* <!-- FAQs ACCORDION --> */}
         <div class="col-12">

             <div class="accordion-wrapper">
                 <ul class="accordion">


                     {/* <!-- QUESTION #1 --> */}
                     <li class="accordion-item  wow animate__animated animate__fadeInUp">

                         {/* <!-- Question --> */}
                         <div class="accordion-thumb">
                             <h5>See Preview of Solution:</h5>
                         </div>

                         {/* <!-- Answer --> */}
                         <div class="accordion-panel">

                             {/* <!-- Text -->	 */}
                               <p>{parse(`${conditionPreview}`)}
                             </p>

                         </div>

                     </li>	
   {/* <!-- END QUESTION #1 --> */}


   {/* <!-- END QUESTION #4 --> */}

                 </ul>
             </div>
         </div>	
{/* <!-- END FAQs ACCORDION -->	 */}
</div>     
{/* <!-- End row --> */}
 </div>	   
{/* <!-- End container --> */}
</section>	
{/* <!-- END FAQs --> */}