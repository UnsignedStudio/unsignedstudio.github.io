axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
records      = require 'roots-records'
S            = require 'string'
fs           = require 'fs'
glob         = require 'glob-all'

module.exports =
  ignores: ['readme.md', 'text.json', '**/layout.*', 'views/casestudy*.*', '**/footer.jade', '**/_*', '.gitignore', 'ship.*conf', 'views']

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    records(
      projects:
        data: [
          { 'name': 'Blockchain',     'url': 'blockchain' },
          { 'name': 'Marine Traffic', 'url': 'marine-traffic-data-visualisation' }
        ]
        template: "views/casestudy.jade"
        out: (item) -> item.url
    )
  ]

  locals:
    S: S
    fs: fs
    glob: glob

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
