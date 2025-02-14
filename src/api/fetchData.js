import { useState, useEffect } from 'react';
import axios from 'axios';

//created because there are certain aspects of a request we know we want and there are features like abort, catch error, etc that we can bundle with this react feature
let apiURL = (process.env.REACT_APP_ENV==='dev'? process.env.REACT_APP_API_SERVER :  process.env.REACT_APP_API_PROD_SERVER) + process.env.REACT_APP_BACKEND_PORT;

const fetchData = async (dataUrl, headers) => {
    // const [data, setData] = useState([]);
    // const [fetchError, setFetchError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);


        //used to cancel request. if we close we want to cancel request just in case
        const controller = new AbortController();
        let response = null;
  //         axios.get('/users', {
  //     headers: {
  //         'MyCustomHeader1': '1',
  //         'MyCustomHeader2': '2'
  //     }
  // })

           // setIsLoading(true);
            try {
              //https://masteringjs.io/tutorials/axios/post-json
                 response = await axios.get(dataUrl, {
                    signal: controller.signal,
                    headers: headers,
                    withCredentials: true, 
                });
                console.log(`testing 123 with headers ${headers}`);
                    // setData(response.data);
                    // setFetchError(null);
            } catch (err) {
              console.log(err)
              response = err
                    // setFetchError(err.message);
                    // setData([]);
            } finally {
                //when we're done making request, we can safely so no more loading
              //  setIsLoading(false);
            }
        

//cacncel the request on cleanup because we could be in the middle of osmething
      
            controller.abort()        

    //pulled responde key out of the object
    return {response };
}

const postData = async (dataUrl, payloadData, headers) => {
  // const [data, setData] = useState([]);
  // const [fetchError, setFetchError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);


      //used to cancel request. if we close we want to cancel request just in case
      const controller = new AbortController();
      let response = null;
console.log(payloadData)

         // setIsLoading(true);
          try {
            //https://masteringjs.io/tutorials/axios/post-json
               response = await axios.post(dataUrl, payloadData, {
                  signal: controller.signal,
                  headers: headers,
                  withCredentials: true, 
              });
              console.log(response);
                  // setData(response.data);
                  // setFetchError(null);
          } catch (err) {
            console.log(err)
            response = err
                  // setFetchError(err.message);
                  // setData([]);
          } finally {
              //when we're done making request, we can safely so no more loading
            //  setIsLoading(false);
          }
      

//cacncel the request on cleanup because we could be in the middle of osmething
    
          controller.abort()        

  //pulled responde key out of the object
  return {response };
}

const putData = async (dataUrl, payloadData, headers) => {
  // const [data, setData] = useState([]);
  // const [fetchError, setFetchError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);


      //used to cancel request. if we close we want to cancel request just in case
      const controller = new AbortController();
      let response = null;
console.log(payloadData)

         // setIsLoading(true);
          try {
            //https://masteringjs.io/tutorials/axios/post-json
               response = await axios.put(dataUrl, payloadData, {
                  signal: controller.signal,
                  headers: headers
              });
              console.log(response);
                  // setData(response.data);
                  // setFetchError(null);
          } catch (err) {
            console.log(err)
            response = err

                  // setFetchError(err.message);
                  // setData([]);
          } finally {
              //when we're done making request, we can safely so no more loading
            //  setIsLoading(false);
          }
      

//cacncel the request on cleanup because we could be in the middle of osmething
    
          controller.abort()        

  //pulled responde key out of the object
  return {response };
}

const deleteData = async (dataUrl, payloadData, headers) => {
  // const [data, setData] = useState([]);
  // const [fetchError, setFetchError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);


      //used to cancel request. if we close we want to cancel request just in case
      const controller = new AbortController();
      let response = null;
      console.log(payloadData)

         // setIsLoading(true);
          try {
            //https://masteringjs.io/tutorials/axios/post-json
               response = await axios.delete(dataUrl, payloadData, {
                  signal: controller.signal,
                  headers: headers
              });
              console.log(response);
                  // setData(response.data);
                  // setFetchError(null);
          } catch (err) {
            console.log(err)
            response = err

                  // setFetchError(err.message);
                  // setData([]);
          } finally {
              //when we're done making request, we can safely so no more loading
            //  setIsLoading(false);
          }
      

//cacncel the request on cleanup because we could be in the middle of osmething
    
          controller.abort()        

  //pulled responde key out of the object
  return {response };
}




export { fetchData,postData, deleteData, putData, apiURL };


//this custom hook replaced
/*
useEffect(() => {
    const fetchPosts = async () => {
      try {
        //axious instance for fetching data
        const response = await api.get('/posts');
        console.log(response.data);
        setPosts(response.data);
       
      } catch (err) {  //axious automatically catches errors not in 200 range
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])
  */