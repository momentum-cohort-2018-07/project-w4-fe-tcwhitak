
import 'shoelace-css/dist/shoelace.css'
import './main.css'

import request from 'superagent'

// add delegated event listener that sets new source for audio and plays audio element
let resultsList = document.getElementById('resultsList')
resultsList.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('albumArtwork')) {
    console.log('you clicked a song')
    let musicPlayer = document.getElementById('songAudio')
    musicPlayer.classList.remove('hiddenAudio')
    musicPlayer.src = e.target.dataset.url
    musicPlayer.play()
  }
})
// grab searchBar
let searchBar = document.getElementById('searchBar')
// what happens when you click submit
searchBar.addEventListener('submit', event => {
  // don't actually "submit"
  event.preventDefault()
  // grab searchField
  let searchField = document.getElementById('searchField')
  // get terms from searchBar->searchField, split on spaces, map and trim to new array of search terms
  let searchTerms = searchField.value.split(' ').map(searchTerm => searchTerm.trim())
  // convert searchTerms to string and replace commas with + symbols
  // using RegExp (g denotes to check for multiple)
  let httpInput = searchTerms.toString().replace(/,/g, '+')
  // search: start get request that adds httpInput on end of url,
  request
    // partial original link: https://itunes.apple.com/search?term=
    // partial proxy link: https://itunes-api-proxy.glitch.me/search?term=
    .get('https://itunes.apple.com/search?term=' + httpInput)
    // parses text to JSON for superagent,
    .then(response => JSON.parse(response.text))
    // clears resultsList and runs loop that calls createResultDOM for each item in results array
    .then(body => {
      document.getElementById('resultsList').innerHTML = ' '
      for (let item of body.results) {
        createResultDOM(item)
      }
    })
  searchBar.reset()
})
// function that grabs item data based on wrapperType,
// formats, and appends to resultsList
function createResultDOM (item) {
  if (item.kind === 'song') {
    // grab results list to append new li elements
    let resultsList = document.getElementById('resultsList')
    // create li for individual search result
    let resultLi = document.createElement('li')
    // add preview url to dataset for audio source
    // resultLi.dataset.previewUrl = item.url
    // add class for handling in css
    resultLi.classList.add('resultItem')
    // set inner html of li to contain image, track title, and artist/band name... eventually audio
    resultLi.innerHTML = `<span class="trackName">${item.trackName}</span><br>
                          <img class="albumArtwork" data-url="${item.previewUrl}" src="${item.artworkUrl100}" alt="album cover"><br>
                          <span class="artistName">${item.artistName}</span>`
    // add li to the resultsList
    resultsList.appendChild(resultLi)
  }
}
