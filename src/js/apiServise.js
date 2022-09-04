import axios from 'axios';
import { Notify } from 'notiflix';

export default class imgApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.BASE_URL = 'https://pixabay.com/api';
    this.KEY = '29464761-8707926121d1c682f07c18901';
    this.HITS_PER_PAGE = 40;
  }

  async fetchImg() {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/?key=${this.KEY}&q=${this.searchQuery}&orientation=horizontal&image_type=photo&safesearch=true&page=${this.page}&per_page=${this.HITS_PER_PAGE}`
      );

      const data = await JSON.parse(response.request.response);

      return data;
    } catch (error) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // get pageNumber() {
  //   return this.page;
  // }

  // set pageNumber(newPage) {
  //   this.page = newPage;
  // }
}
