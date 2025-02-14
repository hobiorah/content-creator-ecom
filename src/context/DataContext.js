import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//import useAxiosFetch from '../hooks/useAxiosFetch';
import {isLoggedIn} from '../api/userManagement';

//import useAxiosFetch from '../hooks/useAxiosFetch';
//instad of passing data to componetns in app, we can provide those values with context feature. you can have mrore than one context in an application

//we have to move state and everything else regarding the data we care about in here
const DataContext = createContext({});

//children refers to the compnents that are within the dataprovider that can get data from the provider - passed in from index.js which passes eerything in
export const DataProvider = ({ children }) => {
    const [searchedForBelief, setSearchedForBelief] = useState('')
    const [searchedForLoadedWord, setSearchedForLoadedWord] = useState('')
    const [search, setSearch] = useState('');
    //array of belief objects
    const [beliefList, setBeliefList] = useState([]);
    //for belief list component
    const [beliefListToDisplay, setBeliefListToDisplay] = useState([]);

    const [conditionListToDisplay, setConditionListToDisplay] = useState(null);
    const [loadedWordList, setLoadedWordList] = useState(null);
    const [fetchBeliefs, setFetchBeliefs] = useState(false);
    const [beliefToDisplay, setBeliefToDisplay] = useState(null);
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
   
    const [conditionToDisplay, setConditionToDisplay] = useState(null);
    const [loadedWordToDisplay, setLoadedWordToDisplay] = useState(null);

    const [insightTagFilters, setInsightTagFilters] = useState([]);
    const  [insightTags, setInsightTags] = useState(null);
    const [insightList, setInsightList] = useState(null);
    const [insightToDisplay, setInsightToDisplay] = useState(null);

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [displayName, setDisplayName] = useState(null);


    //admin
    const [beliefDismantleToAdd, setBeliefDismantleToAdd] = useState(null);


    useEffect(() =>{

        async function init() {
            let checkLogin = await isLoggedIn()
            console.log(checkLogin)

            if(checkLogin?.response?.status >=200)
                {
                  setIsUserLoggedIn(checkLogin?.response?.data.isLoggedIn);
                  setLoggedInUser(checkLogin?.response?.data.user)
                  setDisplayName(checkLogin?.response?.data.displayName)
                } 

        }

        init()
       


        
      
      
        const cleanUp = () => {
            // isMounted = false;
            // controller.abort()
            console.log('cleanup called')
            // source.cancel();
        }
      
        return cleanUp;
      },[]);
   


   // const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');


   // const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
   

   
    return (
        // this declares the variables/functions we want the components to have access to. props that were passed in app component will go here
        <DataContext.Provider value={{
            searchedForBelief, setSearchedForBelief,fetchBeliefs, setFetchBeliefs, beliefList, setBeliefList, beliefToDisplay, setBeliefToDisplay, setLoadedWordList, loadedWordList, setSearchedForLoadedWord, searchedForLoadedWord, conditionToDisplay, setConditionToDisplay, conditionListToDisplay, setConditionListToDisplay, loadedWordToDisplay, setLoadedWordToDisplay, insightTagFilters, setInsightTagFilters, insightTags, setInsightTags, insightList, setInsightList, insightToDisplay, setInsightToDisplay, beliefDismantleToAdd, setBeliefDismantleToAdd, beliefListToDisplay, setBeliefListToDisplay, isUserLoggedIn, setIsUserLoggedIn, loggedInUser, setLoggedInUser, displayName, setDisplayName
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;

