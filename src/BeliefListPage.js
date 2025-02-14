import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from './context/DataContext';
import { useState, useEffect, useContext } from "react";
import SingleBeliefCard from "./SingleBeliefCard";
import { fetchData } from './api/fetchData';
import BeliefList from "./BeliefList";




function BeliefListPage() {
  const { searchedForBelief, setsearchedForBelief, beliefList, beliefToDisplay, setBeliefToDisplay } = useContext(DataContext);
  const navigate = useNavigate();

  let products = ['a','v'];

  const butt = {
    // background: "transparent",
    border: "none",
    cursor: "pointer"
  };

  function displayBelief(beliefId) {
    //tell application what request to make to get data. another option is to use the beleif list already in memory but an admin couldve changed a belief. new feauture: user has to iniatea "refresh" which will update the beleif list or the single belief on page

    //setBeliefToDisplay()
    navigate(`/belief/${beliefId}`)

  }

  const fetchBelief = async (idToSearchFor) => {
    console.log(`id we lliking for ${idToSearchFor}`)
    const headers =  {
        'id': idToSearchFor 
    }
    console.log(headers);


    console.log(`wtf is headers nt working ${headers}`)
    let apiURL = (process.env.REACT_APP_API_SERVER!=='dev'? process.env.REACT_APP_API_SERVER: 'belief-api:') + process.env.REACT_APP_PORT;

    // let fetchedBelief = await fetchData(`http://localhost:4500/beliefs/${idToSearchFor}`);
    let fetchedBelief = await fetchData(apiURL + `/beliefs/${idToSearchFor}`);

    console.log(`fetched belief for 1 pager is ${fetchedBelief.response}`);
    console.log(fetchedBelief.response.data);

    setBeliefToDisplay(fetchedBelief.response.data)
    navigate(`/belief/${idToSearchFor}`)

}
  
  // //filter beliefs based on search
  // const beliefComponents = beliefList.map((belief,i) =>
  //   <li  key={belief._id}>
  //     {/* when click button send you to individual belief page */}
  //     <button style={butt} onClick={(e) => {
  //       fetchBelief(belief._id)
  //     }}>
  //         <SingleBeliefCard belief={belief.belief} metaProblems={belief.metaProblems}/>
  //     </button>
  //     {/* <Link to={`/belief/${belief._id}`}>
  //       <SingleBeliefCard belief={belief.belief} metaProblems={belief.metaProblems}/>
  //     </Link>          
  //     */}
  //   </li>
  // );

  //show list of single card components
  return (
    <> 
     <BeliefList ></BeliefList>
     <h2>Can't find a belief you're looking for? <Link>Submit the belief for review by our experts.</Link>You'll be notified if the belief gets added to the app.</h2>
    </>
    
  );
}

export default BeliefListPage;


