import fs from 'fs-extra'
import fetch from 'isomorphic-fetch'
import slug from 'slug'
import getImages from './get-images'
import osenv from 'osenv'
import mergeCommonBundleFiles from './merge-common-bundle-files'

let homeDirectory = osenv.home()
let configString = fs.readFileSync(homeDirectory + '/.anpgrc')
let config = JSON.parse(configString)

let initialDir = config.outputDir

let writeArticle = (articleObject) => {
  let folderName = slug(articleObject.title.toLowerCase())
  let directoryLocation = `${initialDir}/${folderName}/`
  fs.outputJSON(directoryLocation + 'article.json', articleObject, () => {
    console.log('Written to directory')
    getImages(directoryLocation, articleObject)
    mergeCommonBundleFiles(directoryLocation, config.bundleDir)
  })
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
