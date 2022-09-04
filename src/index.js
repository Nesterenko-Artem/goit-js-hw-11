// const axios = require('axios').default;
import imgApiServise from './js/apiServise';
import { Notify } from 'notiflix';
import createMarkup from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const refs = {
  form: document.querySelector('#search-form'),
  btnSubmit: document.querySelector('#btnSubmit'),
  input: document.querySelector('#inpForm'),
  moreBtn: document.querySelector('#load-more'),
  gallery: document.querySelector('.gallery'),
};

let dataLength;
const photosAPIServise = new imgApiServise();

refs.form.addEventListener('submit', onClickSubmit);
refs.moreBtn.addEventListener('click', onLoadMore);

// let inputSearch;
// function valueInput(event) {
//   photosAPIServise.searchQuery = refs.input.value.trim();

//   console.log(photosAPIServise.query);
// }
const renderGallery = markup => {
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 550,
  });

};

function onClickSubmit(e) {
  e.preventDefault();
  // valueInput();
  
  loadFoto(e);
}

function loadFoto(e) {
  refs.gallery.innerHTML = '';

  photosAPIServise.query = e.target.elements.searchQuery.value.trim();
   
  if (photosAPIServise.searchQuery.length === 0) {
    Notify.failure('Please, enter some text');
  } else {
    photosAPIServise.resetPage();
    photosAPIServise.fetchImg().then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
       
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        const markup = createMarkup(data.hits);
        renderGallery(markup);
        refs.gallery.classList.add('on');
        
      }
      
    });
  }
}

function onLoadMore() {
  photosAPIServise.incrementPage()
   photosAPIServise.fetchImg().then(data => {
     const markup = createMarkup(data.hits);
     renderGallery(markup);
   });
}


