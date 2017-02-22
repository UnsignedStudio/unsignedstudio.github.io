axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
records      = require 'roots-records'
fs           = require 'fs'
glob         = require 'glob-all'
marked       = require 'marked'

module.exports =
  ignores: ['readme.md', 'text.json', '**/layout.*', 'views/casestudy*.*', '**/footer.jade', '**/_*', '.gitignore', 'ship.*conf', 'views']

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    records(
      projects:
        data: [
            { 'name': 'Marine Traffic', 'url': 'marine-traffic-data-visualisation' },
            { 'name': 'Melbourne Quarter Digital Context Model', 'url': 'melbourne-quarter-digital-context-model' },
            { 'name': 'Squint/Opera By The Numbers', 'url': 'squint-opera-data-viz' },
            { 'name': 'Block.Chain.Town', 'url': 'blockchain-data-visualisation' },
            { 'name': 'Melbourne Quarter Projection Wall', 'url': 'melbourne-quarter-projection-wall' }
        ]
        template: "views/casestudy.jade"
        out: (item) -> item.url
    )
  ]

  locals:
    fs: fs
    glob: glob
    marked: marked

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  jade:
    pretty: true
