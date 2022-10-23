import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const myAPIkey = '30644390-4987213536e0a0555c5e4d658';
const perPages = 40;

const fetchPics = async(searchQuery, page) => {
    const response = await axios.get(`/?key=${myAPIkey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPages}&page=${page}`);
    return response.data; 
}
export default fetchPics;
