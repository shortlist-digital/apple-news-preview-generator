import request from 'request'
import fs from 'fs-extra'
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

let filterResponse = (err, response, body) => {
  console.log('Filtering response...')
  if (err) {
    console.log(err)
    throw new Error ('Bad response from the server')
  }
  console.log('-------------')
  let article = JSON.parse(body)
  return writeArticle(article)
}

const builder = (url = 'none' ) => {
  if (url == 'none') {
    return console.log('Builder was not supplied a URL')
  }
  console.log(`Initiating fetch to ${url}`)
  request(url, filterResponse)
}

export default builder
