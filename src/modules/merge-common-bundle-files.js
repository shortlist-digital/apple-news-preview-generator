import fs from 'fs-extra'

const mergeCommonBundleFiles = (destinationDir, sharedDir) => {
  console.log('---------')
  console.log(sharedDir, destinationDir)
  fs.copy(sharedDir, destinationDir, false, () => {
    console.log('merged')
  })
}

export default mergeCommonBundleFiles
