const axios = require('axios').default;


const urlPikabu = 'https://pixabay.com/api';
const KEY = 'key=29464761-8707926121d1c682f07c18901';
const refs = {
   form : document.querySelector('#search-form'),
   btnSubmit : document.querySelector('#btnSubmit'),
   input : document.querySelector('#inpForm'),

}
let inputSearch ;

refs.form.addEventListener('submit', onClickSubmit);

// refs.btnSubmit.addEventListener('click',onClickSubmit)
// refs.form.addEventListener('input',valueInput)

function valueInput(event) {

   inputSearch = refs.input.value.trim();
   console.log(inputSearch);
}

function onClickSubmit(e) {
e.preventDefault();
valueInput();
requestUrl()
   
}



function requestUrl(data) {
  return axios
    .get(`${urlPikabu}/?${KEY}&q=${inputSearch}&image_type=photo&per_page=40`)
    .then(response => {
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}



   
