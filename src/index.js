import program from 'commander'
import packageObject from '../package.json'
import builder from './modules/builder'


program
  .version(packageObject.version)
  .command('get [endpoint]')
  .action((endpoint, options) => {
    console.log('Action fired')
    console.log('Endpoint URL: ', endpoint)
    builder(endpoint)
  })

program.parse(process.argv)
