import path from 'path'
import fs from 'fs-extra'
import traverse from 'traverse'
import wget from 'wget'

let getImage = (directoryLocation, filename, url) => {
  let download = wget.download(url, `${directoryLocation}/${filename}`)
  download.on('end', (output) => {
    console.log('Done: ', output)
  })
}

let findImagesInObject = (directoryLocation, object) => {
  traverse(object).forEach(function(node) {
    if (typeof node == 'string') {
      if (node.slice(0, 4) == 'http') {
        if (node.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)) {
          console.log(node)
          let fileName =  path.basename(node)
          getImage(directoryLocation, fileName,  node)
          this.update(`bundle://${fileName}`)
        }
      }
    }
  })
  console.log('------------')
  console.log(object)
  fs.outputJSON(directoryLocation + 'article.json', object, () => {
    console.log('Downloaded and updated')
  })

}

const getImages = (directoryLocation, articleObject) => {
  console.log(`Getting images for the article in ${directoryLocation}`)
  findImagesInObject(directoryLocation, articleObject)
}

export default getImages
