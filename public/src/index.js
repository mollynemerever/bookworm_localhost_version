document.addEventListener('DOMContentLoaded', () => {
  alert('LOADED');
  addLogInListener()
  addSearchListener()
  addClearButton()
});
const APIKEY = 'AIzaSyDsCVsxHCAgjfN7jFg5raF5JbnrUth2GkI'

function addLogInListener(){
  let button = document.getElementById('login-button')
  console.log('line 11')
  button.addEventListener('click', (ev) => {
    ev.preventDefault()
    console.log('clicked log in')
    let username = document.getElementById('username').value //get user input
    getUserHomepage(username)
  })
}

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

          let saveButton = document.createElement('button')
          saveButton.textContent = 'Save To Reading List'
          saveButton.addEventListener('click', (ev) => {
            ev.preventDefault()
            console.log('add button clicked')
            saveBook(book)
          })
          li.appendChild(saveButton)
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

  function saveBook(book){ //save book to db
    console.log(book)

    let bookTitle = book.volumeInfo.title
    let bookAuthor = book.volumeInfo.authors[0]
    // if(book.volumeInfo.imageLinks){ //not all books have images available
      let bookPhoto = book.volumeInfo.imageLinks.thumbnail
    //   return bookPhoto
    // }
    let bookDesc = book.volumeInfo.description
  console.log('line 89')
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
      body: JSON.stringify({title: bookTitle, author: bookAuthor, photo_url: bookPhoto, description:bookDesc})
    }

    let url = 'http://localhost:3000/api/v1/books'

    fetch(url, config)
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


  function getUserHomepage(username){
    let userName = username
    console.log(username)
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
      body: JSON.stringify({username: userName})
    }
    let url = 'http://localhost:3000/api/v1/users'
    fetch(url, config) //creates username
    //if username exists, then render their homeage
    //if username doesnt exist then render blank homepage
  }
