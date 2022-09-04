// const axios = require('axios').default;
import imgApiServise from './js/apiServise';
import { Notify } from 'notiflix';
import createMarkup from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import OnlyScroll from 'only-scrollbar';

const refs = {
  form: document.querySelector('#search-form'),
  btnSubmit: document.querySelector('#btnSubmit'),
  input: document.querySelector('#inpForm'),
  moreBtn: document.querySelector('#load-more'),
  gallery: document.querySelector('.gallery'),
};

const scroll = new OnlyScroll(document.scrollingElement, {
  damping: 0.8,
});
// let totalPages = 0;
const photosAPIServise = new imgApiServise();

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
lightbox.on('show.lightbox');

const renderGallery = markup => {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  
};

function onClickSubmit(e) {
  e.preventDefault();
  loadFoto(e);
}

function loadFoto(e) {
  photosAPIServise.query = e.target.elements.searchQuery.value.trim();

  refs.gallery.innerHTML = '';

  if (photosAPIServise.searchQuery.length === 0) {
    Notify.failure('Please, enter some text');
  } else {
    photosAPIServise.resetPage();

    photosAPIServise.fetchImg().then(data => {
      // totalPages = Math.ceil(data.totalHits / photosAPIServise.HITS_PER_PAGE);
      if (data.hits.length === 0) {
        validate();
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        const markup = createMarkup(data.hits);
        renderGallery(markup);

        refs.gallery.classList.add('on');

        if (data.totalHits <= 40) {
          refs.moreBtn.classList.add('is-hiden');
        } else {
          refs.moreBtn.classList.remove('is-hiden');
        }
      }
    });
  }
}

function onLoadMore() {
  photosAPIServise.incrementPage();
  photosAPIServise.fetchImg().then(data => {
    const markup = createMarkup(data.hits);
    renderGallery(markup);

    //  if (photosAPIServise.page > totalPages) {
    //    Notiflix.Notify.warning(
    //      "We're sorry, but you've reached the end of search results."
    //    );
    //  }
  });
}

function validate() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

refs.moreBtn.classList.add('is-hiden');
refs.form.addEventListener('submit', onClickSubmit);
refs.moreBtn.addEventListener('click', onLoadMore);
