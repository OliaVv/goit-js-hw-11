import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPics from './js/fetchPics';
import {refs} from './js/refs';
import insertCreatedGallery from './js/createList';
//import smoothScrollToBottomPage from './js/smoothScrollToButtomPage';

let currentPage = 1;
refs.btnLoadMore.classList.add('hide');
const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});

refs.form.addEventListener('submit', handleSubmit);
refs.btnLoadMore.addEventListener('click', loadMore);

function handleSubmit (evt) {
    evt.preventDefault();
    refs.btnLoadMore.classList.add('hide');
    const searchName = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    clearGallery();
    currentPage = 1;
    convertFetchResults(searchName, currentPage); 
}
function loadMore () {
    currentPage += 1;
    const searchName = refs.input.value.trim().toLowerCase();
    convertFetchResults(searchName, currentPage); 
}
async function convertFetchResults (searchQuery, currentPage) {
    try {
        const fetchResult = await fetchPics(searchQuery, currentPage);  
        if (currentPage === 1) {
            Notify.info(`Hooray! We found ${fetchResult.total} images.`);
        }
        filterFetchResult(fetchResult);
    } catch (error) {console.log(error)}
}
function filterFetchResult(fetchResult) {
    if (currentPage === Math.ceil(fetchResult.total / 40)) {
        insertCreatedGallery(fetchResult.hits);  
        refs.btnLoadMore.classList.add('hide');
        Notify.info("We're sorry, but you've reached the end of search results.");
        lightbox.refresh();
        return;
    } else if (fetchResult.total === 0) {
        refs.btnLoadMore.classList.add('hide');
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");   
        return;
    } else { 
        insertCreatedGallery(fetchResult.hits);  
        refs.btnLoadMore.classList.remove('hide');
        lightbox.refresh();
        return;
    }
}
function clearGallery () {
    refs.gallery.innerHTML = "";
}