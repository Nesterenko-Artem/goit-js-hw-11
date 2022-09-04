export default function createMarkup(data) {
  return data
    .map(
      image =>
        `
        <div class="gallery__item">
          <a class="gallery__link" href="${image.largeImageURL}">
              <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="gallery__info">
              <p class="gallery__info-item">
                  <b>Likes</b>${image.likes}
              </p>
              <p class="gallery__info-item">
                  <b>Views</b>${image.views}
              </p>
              <p class="gallery__info-item">
                  <b>Comments</b>${image.comments}
              </p>
              <p class="gallery__info-item">
                  <b>Downloads</b>${image.downloads}
              </p>
          </div>
      </div>`
    )
    .join('');
}
