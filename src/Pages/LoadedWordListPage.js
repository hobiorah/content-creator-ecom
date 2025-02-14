import React from 'react'
import LoadedWordList from '../LoadedWordList';


const LoadedWordListPage = () => {

    const { loadedWordList } = useContext(DataContext);
    const navigate = useNavigate();
  

 //show list of single card components
 return (
    <> 
     <LoadedWordList></LoadedWordList>
     <h2>Loaded Word not here? <Link>Submit your loaded word for review by our experts.</Link>You'll be notified if the word gets added to the app.</h2>
    </>
    
  );
}

export default LoadedWordListPage






