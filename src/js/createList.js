import {refs} from './refs';

 function createCard (picture) { 
    return `
    <div class="photo-card">
    <div class="img-thumb">
    <a class="img-link" href="${picture.largeImageURL}">
    <img src="${picture.webformatURL}" alt="${picture.tags}" title="${picture.tags}" loading="lazy"/></a></div>
    <div class="info">
      <p class="info-item">
        <i>Likes: </i><br> ${picture.likes}</p>
      <p class="info-item">
        <i>Views: </i><br> ${picture.views}</p>
      <p class="info-item">
        <i>Comments: </i><br> ${picture.comments}</p>
      <p class="info-item">
        <i>Downloads: </i><br> ${picture.downloads}</p>
    </div>
    </div>`
}
function createGallery (array) {
    return array.reduce((acc, item) => acc + createCard(item), "");
}
export default function insertCreatedGallery (array) {
    const result = createGallery(array);
    refs.gallery.insertAdjacentHTML('beforeend', result);
}
