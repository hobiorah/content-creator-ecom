import { Button, Callout, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { fetchData, postData, putData,apiURL } from '../api/fetchData';
import parse from 'html-react-parser';


import { useState, useEffect, useContext, useRef} from "react";
import DataContext from '../context/DataContext';
import { useNavigate,useParams } from 'react-router';
import { Link, useSearchParams } from "react-router-dom";

import { InfoCircledIcon } from '@radix-ui/react-icons';

function ConditionPurchase(){

    const { id } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const [purchaseSuccessful, setPurchaseSuccessful] = useState(null);


    
    
    console.log(searchParams.get('canceled'))
    console.log(searchParams)

    console.log(id)


    //get search param after? and query param id. prob navigate to condition if successfull or not

    return (
       <>
         {searchParams.get('success') && <Text>Your purchase was successful. An email receipt should've been sent to you. You can view the receipt in your <Link to='/accountDetails'>account details page</Link>. What you purchased should now be available for viewing. If you have any issues please email us at {`${process.env.REACT_APP_CLARITY_EMAIL}.`}</Text>}
         {searchParams.get('canceled') && <Text>Something happened and the transaction didn't go through. Please try again. If you have any issues please email us at {`${process.env.REACT_APP_CLARITY_EMAIL}.`}</Text>}
       </>
    
);
}

export default ConditionPurchase