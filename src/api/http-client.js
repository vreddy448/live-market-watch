import axios from 'axios';

const get = (url) => {
    return axios.get(url)
};

//Encapsulating in a JSON object

const HttpClient = {
    get
};

export {HttpClient}