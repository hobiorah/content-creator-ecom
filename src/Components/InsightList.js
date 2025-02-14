import React from 'react'

import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from '../context/DataContext';
import { useState, useEffect, useContext } from "react";
import { fetchData } from '../api/fetchData';
import InsightCard from './InsightCard';
import { Flex } from '@radix-ui/themes';

const InsightList = ({insightList}) => {
  const { beliefToDisplay, setInsightToDisplay } = useContext(DataContext);
  const navigate = useNavigate();
    //list of insight cards
  
    
//DO CHECK IF BELIEF EXISTS. IF NOT TELL USER
  //filter beliefs based on search
  const insightCards = insightList.map((insight,i) =>
    {
      
      
        {/* when click button send you to individual belief page */}
        let card = 
         <a  key={insight._id} onClick={(e) => { 
              setInsightToDisplay(insight);
              navigate(`/insights/${insight._id}`);
              // fetchBelief(belief._id)
              }}>
                 {/* could pass individual values instad of whole object */}
            <InsightCard  insight={insight}/>
         </a>
         return card;
    }
    );
    
    
    //show list of single card components
    return (
      <>{insightCards}</>
      // <Flex wrap="wrap" align="" gap="1" >
      //    {insightCards}
      // </Flex>
      // <div className="beliefList"> 
      //   {insightCards}
      // </div>
    );
}

export default InsightList




