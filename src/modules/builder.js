import fs from 'fs'
import fetch from 'isomorphic-fetch'
import slug from 'slug'

let writeArticle = (articleObject) => {
  let folderName = slug(articleObject.title.toLowerCase())
  console.log('New project will be written to: ', folderName)
}

let filterResponse = (response) => {
  console.log('Filtering response...')
  if (response.status >= 400) {
    throw new Error ('Bad response from the server')
  }
  return response.json()
}

const builder = (url = 'none' ) => {
  if (url == 'none') {
    return console.log('Builder was not supplied a URL')
  }
  console.log(`Initiating fetch to ${url}`)
  return fetch(url)
    .then(filterResponse)
    .then(writeArticle)
}

export default builder
