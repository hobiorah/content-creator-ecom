import { Route, Routes, useNavigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
// import './App.css';

import BeliefList from './BeliefList';
import Home from './Home';
import BeliefPage from './BeliefPage';
import BeliefSearch from './BeliefSearch';
import LoadedWordSearch from './LoadedWordSearch';
import LoadedWordList from './LoadedWordList';
import Layout from './Layout';
import ConditionsList from './ConditionPages/ConditionsList'
import ConditionPage from './ConditionPages/ConditionPage'
import Reader from './Reader';
import BeliefListPage from './BeliefListPage';
import LoadedWordPage from './LoadedWordPage';
import InsightSearch from './Pages/InsightSearch';
import SingleInsightPage from './Pages/SingleInsightPage';
import AddBelief from './Pages/Admin/AddBelief';
import AddCondition from './Pages/Admin/AddCondition';
import AddLoadedWord from './Pages/Admin/AddLoadedWord';
import AddInsight from './Pages/Admin/AddInsight';
import Login from './Pages/Admin/Login';
import Forum from './Components/Forum/Forum';
import { PostPage } from './Pages/Forum/PostPage';
import CreatePost from './Pages/Forum/CreatePost';
import CreateAccount from './Pages/CreateAccount';
import ConditionListPage from './ConditionPages/ConditionListPage';
import ConditionPurchase from './Pages/ConditionPurchase';
import AccountDetails from './Pages/AccountDetails';

import AppNavigate from './AppNavigate';
import AppNavigate2 from './AppNavigate2';
import SubscriptionDetails from './Pages/SubscriptionDetails';
import Christians from './Pages/Christians'
import TherapistHome from './TherapistHome';
import AppNavigateConfidence from './AppNavigateConfidence';




function App() {
  const navigate = useNavigate();

  if (process.env.REACT_APP_ENV === 'prod') {
    console.log = () => {};
}

 // console.log('render apps')
  const searchForBelief = (belief) => {
    //console.log('in searchfor beleif method')
    navigate('/beliefs')
    //use string provided and search through db list of beleifs and find relevatn matches. provide matches in a list for user to scroll through
  }

  const LandingPage = () => {
    window.location.href = '/overview.html';
    return null; // Or a loading spinner if needed
};

  return (
  <DataProvider> 
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<AppNavigate></AppNavigate>}/>
        <Route path="appHome" element={<Home/>}/>
        <Route path="beliefSearch" element={<BeliefSearch/>}/>
        <Route path="beliefs" element={<BeliefListPage/>}/>  
        <Route path="belief/:beliefId/edit" element={<AddBelief/>}/>
        <Route path="belief/:beliefId" element={<BeliefPage/>}/>

        <Route path="loadedWordSearch" element={<LoadedWordSearch/>}/>
        <Route path="loadedWords" element={<LoadedWordList/>}/>
        <Route path="loadedWords/:id" element={<LoadedWordPage/>}/>
        <Route path="loadedWords/:id/edit" element={<AddLoadedWord/>}/>

        <Route path="conditions" element={<ConditionListPage/>}/>
        <Route path="/condition/:id" element={<ConditionPage/>}/>
        <Route path="/condition/:conditionId/:type/:conditionName" element={<ConditionListPage/>}/>
        <Route path="/condition/:conditionId/:type/:conditionName" element={<ConditionListPage/>}/>
        <Route path="/condition/:id/edit" element={<AddCondition/>}/>

        <Route path="/eliminateTrigger" element={<Reader/>}/>

        <Route path="/insights" element={<InsightSearch/>}/>
        <Route path="/insights/:insightId" element={<SingleInsightPage/>}/>
        <Route path="/insights/:insightId/edit" element={<AddInsight/>}/>

        <Route path="/addBelief" element={<AddBelief/>}/>
        <Route path="/addCondition" element={<AddCondition/>}/>
        <Route path="/addLoadedWord" element={<AddLoadedWord/>}/>
        <Route path="/addInsight" element={<AddInsight/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/createAccount" element={<CreateAccount/>}/>


        <Route path="/posts/:postType/:referencingObjectId/:objectTitle" element={<Forum/>}/>
        <Route path="/posts/:postType/:referencingObjectId/:parentObjectName/post/:postId" element={<PostPage/>}/>
        <Route path="/posts/:postType/:referencingObjectId/:objectName/createPost" element={<CreatePost/>}/>



        <Route path="/conditionPurchase/:id" element={<ConditionPurchase/>}/>
        <Route path="/conditionPurchase/" element={<ConditionPurchase/>}/>


        <Route path="/accountDetails/" element={<AccountDetails/>}/>
        <Route path="/appnavigate/" element={<AppNavigateConfidence/>}/>
        <Route path="/appnavigate2/" element={<AppNavigate2/>}/>

        <Route path="/subscription/" element={<SubscriptionDetails/>}/>
        <Route path="/christians/" element={<Christians/>}/>
        <Route path="/therapists/" element={<TherapistHome/>}/>
        <Route path="/public/" element={<AppNavigate/>}/>




        











       

      </Route>
      {/* <Route path="/belief/:id" element={<BeliefPage/>}/> */}
      {/* <Route path="/beliefs" element={<BeliefList/>}/>   */}

      {/* <Route path="/loadedWordSearch" element={<LoadedWordSearch/>}/>
      <Route path="/loadedWords" element={<LoadedWordList/>}/> */}
    </Routes>
  </DataProvider>
   //sometyime typeis in beleif they;re looking for
   //toggel and search by problem instead
  //  <>
  //     <input
  //         id="searchBelief"
  //         type="text"
  //         placeholder="Search for a belief"
  //         //value={search}
  //         //onChange={(e) => setSearch(e.target.value)}
  //       />  
  //       <button onClick={searchForBelief}>Search</button>
  //   </> 
   
  );
}

export default App;

