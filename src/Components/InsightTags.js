import React from 'react'
import DataContext from '../context/DataContext';
import { useState,useRef, useEffect, useContext } from "react";
import { Button } from '@radix-ui/themes';


const InsightTags = ({insightTags}) => {
    const { setInsightTagFilters, insightTagFilters  } = useContext(DataContext);
    //https://react.dev/learn/manipulating-the-dom-with-refs
    const tagButtonsRef = useRef(null);

    function getRefMap() {
        if (!tagButtonsRef.current) {
          // Initialize the Map on first usage.
          tagButtonsRef.current = new Map();
        }
        return tagButtonsRef.current;
      }
    


    
  const filterInsights = async (tagsToFilterOn) => {
    // console.log(`id we lliking for ${idToSearchFor}`)
    // const headers =  {
    //     'id': idToSearchFor 
    // }
    // console.log(headers);


    // console.log(`wtf is headers nt working ${headers}`)
    // let fetchedBelief = await fetchData(`http://localhost:4500/beliefs/${idToSearchFor}`);
    // console.log(`fetched belief for 1 pager is ${fetchedBelief.response}`);
    // console.log(fetchedBelief.response.data);

    // setBeliefToDisplay(fetchedBelief.response.data)
    // navigate(`/belief/${idToSearchFor}`)

}

//DO CHECK IF BELIEF EXISTS. IF NOT TELL USER
  //filter beliefs based on search
  const tagComponents = insightTags.map((tag,i) =>
  {
   
    
      {/* when click button send you to individual belief page */}
      let tagComponent = 
       <Button variant="solid" radius="full" className="tagButtonNotSelected" highContrast key={i} ref={(node) => 
        {
            const map = getRefMap();
            if (node) {
              // console.log(node)
            map.set(tag, node); //insert KV of this tag which will map to this button/node
             } else { 
              // delete when node is removed from DOM
            map.delete(tag);
            }
            // console.log(map)
      }} onClick={(e) => 
        { 
   
            const map = getRefMap();
            // console.log(map)
            let thisTagButton = map.get(tag)
            console.log(thisTagButton.className)



            // used to be ===
            if(thisTagButton.className.includes("tagButtonNotSelected")){
               let newClassName = thisTagButton.className.replace("tagButtonNotSelected", 'tagButtonSelected')
               thisTagButton.className = newClassName;
               // thisTagButton.className.replace("tagButtonNotSelected", 'tagButtonSelected')
                let newInsightTagFilters = insightTagFilters.map(x => x);
                newInsightTagFilters.push(tag)
                console.log(newInsightTagFilters)
                //this should trigger tag list page to filter list using new set of tags
                setInsightTagFilters(newInsightTagFilters)
            } else if (thisTagButton.className.includes("tagButtonSelected"))
            {
                // thisTagButton.className="tagButtonNotSelected";
                let newClassName = thisTagButton.className.replace("tagButtonSelected", 'tagButtonNotSelected')
                thisTagButton.className = newClassName;
               // thisTagButton.className.replace("tagButtonSelected", 'tagButtonNotSelected')
                console.log(insightTagFilters)
                let listWithoutTag = insightTagFilters.filter((currentTag) =>{
                    if  (tag!==currentTag)
                    {
                        return currentTag;
                    }
                })
                console.log(listWithoutTag)
                setInsightTagFilters(listWithoutTag)
            }

            // fetchBelief(belief._id)
            }}>{tag}          
       </Button>
       return tagComponent;
  }
  );
  
  
  //show list of single card components
  return (
    <> {tagComponents}</>
   
    // <div className="insightTags"> 
    //   {tagComponents}
    // </div>
  );

}

export default InsightTags








