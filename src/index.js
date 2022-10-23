import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPics from './js/fetchPics';
import {refs} from './js/refs';
import insertCreatedGallery from './js/createGallery';

let currentPage = 1;
refs.btnLoadMore.classList.add('is-hidden');
const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});

const notifyOptions = {
    position: 'center-top',
    backOverlay: true,
    clickToClose: true,
    timeout: 500,
}

refs.form.addEventListener('submit', handleSubmit);
refs.btnLoadMore.addEventListener('click', loadMore);

function handleSubmit (evt) {
    evt.preventDefault();
    refs.btnLoadMore.classList.add('is-hidden');
    const searchName = evt.currentTarget.elements.searchQuery.value.trim().toLowerCase();
    if (!searchName) {
    Notify.failure('Введіть дані для пошуку!!!',notifyOptions);
    return;
  }
    clearGallery();
    currentPage = 1;
    refs.form.reset();
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
            Notify.success (`Знайдено ${fetchResult.total} зображень.`, notifyOptions);
        }
        filterFetchResult(fetchResult);
    } catch (error) {console.log(error)}
}
function filterFetchResult(fetchResult) {
    if (currentPage === Math.ceil(fetchResult.total / 40)) {
        insertCreatedGallery(fetchResult.hits);  
        refs.btnLoadMore.classList.add('is-hidden');
        Notify.info("Це всі знайдені зображення.", notifyOptions);
        lightbox.refresh();
        return;
    } else if (fetchResult.total === 0) {
        refs.btnLoadMore.classList.add('is-hidden');
        Notify.failure(`На жаль, за вашим запитом зображень не знайдено!`, notifyOptions);   
        return;
    } else { 
        insertCreatedGallery(fetchResult.hits);  
        refs.btnLoadMore.classList.remove('is-hidden');
        lightbox.refresh();
        return;
    }
}
function clearGallery () {
    refs.gallery.innerHTML = "";
}