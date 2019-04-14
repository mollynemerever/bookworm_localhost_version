document.addEventListener('DOMContentLoaded', () => {
  alert('LOADED');
});

const APIKEY = 'AIzaSyDsCVsxHCAgjfN7jFg5raF5JbnrUth2GkI'
const searchTerm = 'crawdad'
const SEARCHURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${APIKEY}`


fetch(SEARCHURL)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    //debugger
    renderSearchResults(data)
  })

  //data.items[0].volumeInfo.title

  // function renderSearchResults(data){
  //   const array = data.items
  //   let ul = document.getElementById('search-results')
  //   array.forEach(function(book){
  //     let li = document.createElement('li')
  //     li.classList.add('book-title')
  //     li.textContent = `${book.volumeInfo.title}`
  //     let subUL = document.createElement('ul')
  //     subUL.classList.add('book-details')
  //     let subLI = document.createElement('li')
  //     subLI.classList.add('book-detail-item')
  //     subLI.textContent = `Author(s):  ${book.volumeInfo.authors}`
  //     if(book.volumeInfo.imageLinks){ //not all books have images available
  //       let img = document.createElement('img')
  //       img.src = book.volumeInfo.imageLinks.thumbnail
  //       subLI.appendChild(img)
  //     }
  //     subUL.appendChild(subLI)
  //     li.appendChild(subUL)
  //     ul.appendChild(li)
  //   })

  }
