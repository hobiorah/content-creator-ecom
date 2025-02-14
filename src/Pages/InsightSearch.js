import React, { useEffect, useState,useContext } from 'react'
import DataContext from '../context/DataContext';
import { fetchData, apiURL } from '../api/fetchData';
import InsightTags from '../Components/InsightTags';
import './InsightSearch.css';
import InsightList from '../Components/InsightList';
import { Flex, Box, Heading } from '@radix-ui/themes';




const InsightSearch = () => {
const {insightTagFilters, setInsightTagFilters, insightTagstagsToUse, insightTags, setInsightTags } = useContext(DataContext);
//fuutre refresh button in case whats in cache is old

// let insightsToRender=insightList;
const [insightsToRender, setInsightsToRender] = useState(null);
const [searchedForInsight, setSearchedForInsight] = useState(null);
const [insightList, setInsightList] = useState(null);



useEffect(() =>{

    //if anything we need isnt set like tags, get the data. could do it all at once or break out with ifs to minimize requests

    //get tags. api/insights/tags
    const getTags = async ()=> {
        // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
        // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

        let fetchedTags = await fetchData(apiURL + '/insights/tags');

        fetchedTags = fetchedTags?.response?.data;
        setInsightTags(fetchedTags);
    }

    const getInsights = async ()=> {
        // let apiURL = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_PORT;
        // let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

        let fetchedInsights = await fetchData(apiURL + '/insights');
        console.log(fetchedInsights)
        fetchedInsights = fetchedInsights?.response?.data;
        setInsightList(fetchedInsights);
        setInsightsToRender(fetchedInsights)
    }
   

    if(!insightTags) //tags havent been retrieved for this session (not in localstorage or current state)
        getTags();

    if(!insightList)
        getInsights();
    


    const cleanUp = () => {
        // isMounted = false;
        // controller.abort()
        console.log('cleanup called')
        // source.cancel();
    }

    return cleanUp;
},[]);

useEffect(() =>{


    console.log('not firiign hen insighttagfilters changes/?')
    if(insightList && insightTags) 
    {
         console.log('not filtering?')
         console.log(insightTagFilters)
         console.log(insightsToRender)
        if(insightTagFilters.length ===0) {
            setInsightsToRender( insightList)  
            return 
        }
            
    
        //filter insights based on whats being typied
        if(insightsToRender)
        {
            let filteredList = insightsToRender.filter((insight) => 
                {
        
                    //for every insight, loop through tag list and see if any tag element is in the insight tag array. if so, return 
                    console.log('in insightsto render filter')
                    console.log(insightTagFilters)
                    console.log(insightsToRender)
                    for (let i = 0; i<insightTagFilters.length; i++)
                    {
                    
                        // console.log(insight)
                        // console.log(tag)
                        
                        //if any are false 
                        console.log(insight.tags.includes(insightTagFilters[i]))
                        return (insight.tags.includes(insightTagFilters[i]))
        
                        // if (insight.tags.includes(tag))
                        // {
                        //     console.log('are we in truh')
                        //     return insight
                        // }
                            
                    }
                    //return true if we get here
                    console.log('finished for each ')
                    console.log(insightTagFilters)
                    console.log(insightsToRender)
                    // if(insight.tags.includes(tag))
                    //     return insight
                
                })
                setInsightsToRender(filteredList);
                console.log(insightTagFilters)
                 console.log(insightsToRender)
        }
        
    
            //filter insights based on whats being typied
    
    }

    

   //create new array
    const cleanUp = () => {
        // isMounted = false;
        // controller.abort()
        // source.cancel();
    }

    return cleanUp;
},[searchedForInsight,insightTagFilters, insightsToRender]);


  return (
    <div className='container'>
    <h1 class='mb-2'>Insights</h1>
    {/* <input
        id="searchInsight"
        type="text"
        placeholder=""
        //value={search}
        onChange={(e) => setSearchedForInsight(e.target.value)}
      /> */}
      <Flex justify="center" wrap='wrap'>

     
      {/* //each tag has onlcik thtat will update an array of filters that will impact insight list */}
      {insightTags && <Flex  mb="2"> <InsightTags insightTags={insightTags}></InsightTags> </Flex> }
      {/* <button onClick={searchForBelief}>Search</button> */}

      {/* render buttons of tags from insight db */}
      {/* insightlist  */}

     {/* {!insightsToRender ? <p>Loading insights..</p>:<Flex width="100%" >  <InsightList insightList={insightsToRender}></InsightList></Flex>} */}
     </Flex>
     {!insightsToRender ? <p>Loading insights..</p>:  <div class="fbox-wrapper">
						<div class="row row-cols-1 row-cols-md-3 rows-3">  {   <InsightList insightList={insightsToRender}></InsightList>}
          </div>
            </div> }

    </div>
  )
}

export default InsightSearch