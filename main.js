// function from clinton that makes itunes API usable with superagent
// request.get("https://itunes.apple.com/search?term=jack+johnson")
//   .then(response => JSON.parse(response.text))
//   .then(body => console.log(body.resultCount))
import 'shoelace-css/dist/shoelace.css'
import './main.css'

import request from 'superagent'
