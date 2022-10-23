import {refs} from './refs';

 function createCard ({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) { 
    return `
    <div class="photo-card">
      <div class="img-thumb">
        <a class="img-link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy"/></a></div>
        <div class="info">
          <p class="info-item">
            <i>Likes: </i><br> ${likes}</p>
          <p class="info-item">
            <i>Views: </i><br> ${views}</p>
          <p class="info-item">
            <i>Comments: </i><br> ${comments}</p>
          <p class="info-item">
            <i>Downloads: </i><br> ${downloads}</p>
      </div>
    </div>`
}
function createGallery (array) {
    return array.map(item =>createCard(item)).join("");
}
export default function insertCreatedGallery (array) {
    const result = createGallery(array);
    refs.gallery.insertAdjacentHTML('beforeend', result);
}
