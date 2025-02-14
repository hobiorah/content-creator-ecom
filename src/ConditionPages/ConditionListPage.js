import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import ConditionList from './ConditionsList';
import { fetchData, apiURL } from '../api/fetchData';
import { Callout, Em, Heading } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const ConditionListPage = ({}) => {
    
    //console.log(parse(ourDefinition)); 
    const [conditionListToPass, setConditionListToPass] = useState(null);
    const { conditionId, type, conditionName } = useParams();


    
    
    const getConditions = async () => {
 
        
    if(type)
    {
        let fetchedConditions = await fetchData(apiURL + `/conditions/${conditionId}/${type}`);
        console.log(fetchedConditions);
        //set beleif list which will be used to create belief cards on next page
        setConditionListToPass(fetchedConditions?.response?.data);
        console.log(fetchedConditions.response.data);
        //navigate('/conditions')
    } else {
    
    let fetchedConditions = await fetchData(apiURL + '/conditions');
    console.log(fetchedConditions);
    //set beleif list which will be used to create belief cards on next page
    setConditionListToPass(fetchedConditions?.response?.data);
    }
    
      //if a trigger, get triggers for this condition - pull condition id, and type from url
      
      }

    useEffect(() =>{

        if(!conditionListToPass)
          {
            getConditions()
          }
        
      
      
        const cleanUp = () => {
            // isMounted = false;
            // controller.abort()
            console.log('cleanup called')
            // source.cancel();
        }
      
        return cleanUp;
      },[]);
    
  
  return (
    <div class="container">
    {/* <Heading>Solutions:</Heading> */}
    { (type!=='fear' && type!=='trigger') && <Callout.Root color='gold' highContrast size="1">
                                    
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                   <span class='m-0 small'>We call each solution below a psychological prescription. To learn what a psychological prescription is go <a  href="/insights/677c342e34bcee92913561a8" class='color--indigo' >here.</a>                     
                    </span>
                </Callout.Root> }
    {type && <Heading>{type==='fear' ? `Solutions for Fears someone with ${conditionName} may have:`: `Solutions for Triggers someone with ${conditionName} may have:` }</Heading>}
    {!type && <Heading>Conditions we have solutions for:</Heading>}
    <Heading mb ='2' 
    size='3'>Want help picking what's right for you? <a class='color--purple' href={`${process.env.REACT_APP_CONTACT_FORM}`}>Contact us</a>—select "Get Help Finding a solution"—with your unique situation and we will give you a recommendation.</Heading>
    
    {conditionListToPass && <ConditionList parentCondition={conditionId} type={type} passedInList={conditionListToPass} ></ConditionList>}
    {    (type!=='fear' || type!=='trigger') &&  <h5>Can't find your Condition? <a class='color--purple' href='https://forms.gle/CNUsuLWMNA4sb6SHA'>Submit your condition for review by our experts.</a>You'll be notified if the condition gets added to the app.</h5>

    }
    </div>
    
  );
}

export default ConditionListPage