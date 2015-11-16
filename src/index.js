import program from 'commander'
import packageObject from '../package.json'
import builder from './modules/builder'
import osenv from 'osenv'
import fs from 'fs'

program
  .version(packageObject.version)
  .command('get [endpoint]')
  .action((endpoint, options) => {
    builder(endpoint)
  })

program.parse(process.argv)
