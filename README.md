# apple-news-preview-generator

Create News Preview compatible folders from an Apple News compatible JSON endpoint

## Installation

`npm i -g anpg`

## Command Line

WIP: Command line tool

`anpg get apple-news.com/patible/json-endpoint`

TODO:

`anpg watch apple-news.com/patible/json-endpoint`

## Configuration

Create a file in your home directory called `~/.anpgrc`

It should be valid JSON that contains two keys `outputDir` - where your artcles will be output to, and `bundleDir` - this is a folder of shared files that you want in all your bundles, normally fonts and icons etc.


```
 {
  "outputDir": "/Users/USERNAME/Desktop/apple-news-previews",
  "bundleDir": "/Users/USERSNAME/apple-news-bundle-files"
 }
```

## Development

Run `npm start` to build the initial files and link the command line tool to your local environment`

Run `npm run watch-cli` to watch the `src` directory for changes and rebuild the CLI continually
