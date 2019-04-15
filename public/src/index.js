document.addEventListener('DOMContentLoaded', () => {
  alert('LOADED');
  addSearchListener()
  addClearButton()
});

const APIKEY = 'AIzaSyDsCVsxHCAgjfN7jFg5raF5JbnrUth2GkI'


 function addClearButton(){
  let button = document.getElementById('clear-button')
  button.addEventListener('click', (ev) => {
    ev.preventDefault()
    console.log('clicked clear')
    clearPageContents()
  })
 }


function addSearchListener(){
  let button = document.getElementById('search-button')
  button.addEventListener('click', (ev) => {
    ev.preventDefault()
    let searchTerm = document.getElementById('search-input').value
    console.log(searchTerm)
    let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${APIKEY}`
    console.log(searchUrl)
    searchAndRender(searchUrl, searchTerm)
  })
}
  //data.items[0].volumeInfo.title

  function searchAndRender(url, searchTerm){ //searches google api and prints to page
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        clearSearchField()

        let ul = document.getElementById('search-results')
        let header = document.getElementById('results-for')
        header.textContent = `Search Results for: ${searchTerm}`

        let array = data.items

        array.forEach(function(book){
          let li = document.createElement('li')
          li.classList.add('book-title')
          li.textContent = `${book.volumeInfo.title}`
          let subUL = document.createElement('ul')
          subUL.classList.add('book-details')
          let subLI = document.createElement('li')
          subLI.classList.add('book-detail-item')
          subLI.textContent = `Author(s):  ${book.volumeInfo.authors}`
          if(book.volumeInfo.imageLinks){ //not all books have images available
            let img = document.createElement('img')
            img.src = book.volumeInfo.imageLinks.thumbnail
            subLI.appendChild(img)
          }
          subUL.appendChild(subLI)
          li.appendChild(subUL)
          ul.appendChild(li)
        })
      })
  }

  function clearSearchField(){ //clears search field
    let field = document.getElementById('search-input')
    field.value = ""
  }

  function clearPageContents(){ //clears search results
    let content = document.getElementById('search-results')
    while(content.firstChild){
      content.removeChild(content.firstChild)
    }
  }
