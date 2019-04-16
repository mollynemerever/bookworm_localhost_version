document.addEventListener('DOMContentLoaded', () => {
  addLogInListener()
});
const APIKEY = 'AIzaSyDsCVsxHCAgjfN7jFg5raF5JbnrUth2GkI'
var USERID = ""

function addLogInListener(){
  let button = document.getElementById('login-button')
  button.addEventListener('click', (ev) => {
    ev.preventDefault()
    console.log('clicked log in')
    let doc = document.getElementById('form-signin')
    let username = document.getElementById('username').value
    while(doc.firstChild){ //clear log in form
      doc.removeChild(doc.firstChild)
    }
    logInUser(username)
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

  function saveBook(book){ //save books db
    console.log(book)
    let bookTitle = book.volumeInfo.title
    let bookAuthor = book.volumeInfo.authors[0]
    // if(book.volumeInfo.imageLinks){ //not all books have images available
      let bookPhoto = book.volumeInfo.imageLinks.thumbnail
    //   return bookPhoto
    // }
    let bookDesc = book.volumeInfo.description
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
      body: JSON.stringify({title: bookTitle, author: bookAuthor, photo_url: bookPhoto, description:bookDesc})
    }
    let url = 'http://localhost:3000/api/v1/books'
    fetch(url, config) // saves to book db
      .then(resp => resp.json())
      .then(data => {
        let bookId = data.id
        console.log(data)
        createUsersBooksInstance(bookId)
      })
  }

  function createUsersBooksInstance(bookId){
    let url = 'http://localhost:3000/api/v1/usersbooks'
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
       body: JSON.stringify({user_id: USERID, book_id: bookId})
    }
    fetch(url, config)
      // .then(resp => resp.json())
      // .then(data => {
      //   console.log(data)
      // })
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


  function logInUser(username){
    let config = {
      method: 'POST',
      headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
      body: JSON.stringify({username: username})
    }
    let url = 'http://localhost:3000/api/v1/users'
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        USERID = data.id
        let username = data.username
        renderHomePage(username)
        })
  }


  function renderHomePage(username){
    let welcome = document.getElementById('welcome-bar')
    welcome.textContent = `Welcome, ${username}`
    let blurb = document.getElementById('fill-in')
    blurb.textContent = 'Interesting information about your account'
    renderSearchBar()
    renderReadingList()   //functionality to render user's books
  }

  function renderReadingList(){
    let url = `http://localhost:3000/api/v1/usersbooks/${USERID}`
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
  }

  function renderSearchBar(){
    let searchBar = document.getElementById('search-bar')
    let searchField = document.createElement('input')
    searchField.type = 'text'
    searchField.id = 'search-input'
    searchField.placeholder = 'book title'
    searchBar.appendChild(searchField)

    let searchButton = document.createElement('button')
    searchButton.type = 'button'
    searchButton.textContent = 'Search'
    searchButton.id = 'search-button'
    searchButton.classList.add('btn-primary')
    searchBar.appendChild(searchButton)

    let clearButton = document.createElement('button')
    clearButton.type = 'button'
    clearButton.textContent = 'Clear Search Results'
    clearButton.id = 'clear-button'
    clearButton.classList.add('btn-primary')
    searchBar.appendChild(clearButton)

    addSearchButtonListener()
    addClearButtonListener()
  }

  function addClearButtonListener(){
   let button = document.getElementById('clear-button')
   button.addEventListener('click', (ev) => {
     ev.preventDefault()
     console.log('clicked clear')
     clearPageContents()
   })
  }

  function addSearchButtonListener(){
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
