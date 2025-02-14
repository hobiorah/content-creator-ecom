
import axios from 'axios';

//this seems to return an api object
export default axios.create({
    // have to update when we are hitting a prodcution/different server
    baseURL: 'http://localhost:4500'
});

