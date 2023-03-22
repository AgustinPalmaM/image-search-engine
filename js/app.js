import API_KEY from "../apiKey.js";

const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');
const paginationDiv = document.querySelector('#paginacion');

const resultsPerPage = 30;
let totalPages;
let iterator;
let currentPage = 1;

window.onload = () => {
  form.addEventListener('submit', validateForm);
}

function validateForm(e) {
  e.preventDefault();

  const searchText = document.querySelector('#termino').value;

  if(searchText === '') {
    showAlert("You should type a text to search some image");
    return
  }

  searchImages();

}

function showAlert(message) {
  const alertExist = document.querySelector('.bg-red-100');
  if(!alertExist) {

    const alert = document.createElement('P');
    const strong = document.createElement('STRONG');
    const span = document.createElement('SPAN');

    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
    strong.classList.add('font-bold');
    strong.textContent = 'ERROR! ';

    span.classList.add('block', 'sm:inline');
    span.textContent = message;

    alert.appendChild(strong);
    alert.appendChild(span);

    form.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    },1500)
  }
}

function searchImages() {
  const textSearch = document.querySelector('#termino').value;

  const key = API_KEY;
  const url = `https://pixabay.com/api/?key=${key}&q=${textSearch}&per_page=${resultsPerPage}&page=${currentPage}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalPages = calculatePagination(data.totalHits);
      showImages(data.hits)
    })
}

function showImages(origin) {
  cleanHtml(result)
  origin.forEach(element => {
    const { previewURL, likes, views, largeImageURL } = element
    const mainCointainer = document.createElement('DIV');
    mainCointainer.classList.add('w-1/2', 'md:w-1/3', 'lg:w-1/4', 'p-3', 'mb-4');
    
    const div = document.createElement('DIV');
    div.classList.add('bg-white');

    const img = document.createElement('IMG');
    img.classList.add('w-full');
    img.src = previewURL;

    const divInfoImage = document.createElement('DIV');
    divInfoImage.classList.add('p-4');

    const numLikes = document.createElement('P');
    numLikes.classList.add('font-bold')
    numLikes.textContent = likes;

    const textLikes = document.createElement('SPAN');
    textLikes.classList.add('font-light')
    textLikes.textContent = ' Likes';

    const numViews = document.createElement('P');
    numViews.classList.add('font-bold')
    numViews.textContent = views;

    const textViews = document.createElement('SPAN');
    textViews.classList.add('font-light')
    textViews.textContent = ' Views';

    const linkLargeImage = document.createElement('A');
    linkLargeImage.classList.add('block','w-full', 'bg-blue-800','hover:bg-blue-500', 'text-white', 'uppercase', 'font-bold', 'text-center', 'rounded', 'mt-5', 'p-1')
    linkLargeImage.textContent = 'View max resolution';
    linkLargeImage.href = largeImageURL;
    linkLargeImage.target = '_blank';
    linkLargeImage.rel = 'noopener noreferrer';

    numLikes.appendChild(textLikes);
    numViews.appendChild(textViews);
    divInfoImage.appendChild(numLikes);
    divInfoImage.appendChild(numViews);
    divInfoImage.appendChild(linkLargeImage);

    div.appendChild(img);
    div.appendChild(divInfoImage);

    mainCointainer.appendChild(div);

    result.appendChild(mainCointainer);
  

  });
  showPagination();
}

function cleanHtml(element) {
  while(element.firstChild) {
    element.firstChild.remove()
  }
}

function calculatePagination(totalHits) {
  return parseInt(Math.ceil(totalHits / resultsPerPage));
}

// this is a generator to register the length or the number of elements in our pagination

function *createPagination(total) {
  for (let i = 1; i <= totalPages; i++) {
    yield i;
  }
}

function showPagination() {
  cleanHtml(paginationDiv);
  iterator = createPagination(totalPages);
  while (true) {
    const { value, done } = iterator.next();
    // if done === true don't create more buttons in the pagination
    if(done) return;

    const button = document.createElement('A');
    button.href = '#';
    button.dataset.page = value;
    button.textContent = value;
    button.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-2', 'rounded');

    button.onclick = () => {
      currentPage = value;
      searchImages();
    }

    paginationDiv.appendChild(button);
  }
  
}