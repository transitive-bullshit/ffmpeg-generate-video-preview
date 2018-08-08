#!/usr/bin/env node
'use strict'

const commander = require('commander')
const generatePreview = require('.')
const { version } = require('../package')

module.exports = (argv) => {
  commander
    .version(version)
    .usage('[options] <input> <output>')
    .option('-w, --width <width>', 'frame width', (n) => parseInt(n))
    .option('-h, --height <height>', 'frame height', (n) => parseInt(n))
    .option('-q, --quality <n>', 'frame image quality', (n) => parseInt(n))
    .option('-n, --num-frames <n>', 'number of frames to capture', (n) => parseInt(n))
    .option('-p, --num-frames-percent <n>', 'number of frames to capture as % of overall frames', parseFloat)
    .option('-P, --padding <n>', 'image strip tile padding', (n) => parseInt(n), 0)
    .option('-M, --margin <n>', 'image strip border margin', (n) => parseInt(n), 0)
    .option('-r, --rows <n>', 'image strip number of rows', (n) => parseInt(n))
    .option('-c, --cols <n>', 'image strip number of cols', (n) => parseInt(n))
    .option('-C, --color <color>', 'image strip background color', (s) => s, 'Black')
    .option('-f, --gif-fps <n>', 'gifski fps', (n) => parseInt(n), 10)
    .option('-Q, --gif-quality <n>', 'gifski quality', (n) => parseInt(n), 80)
    .option('-F, --gif-fast', 'enable gifski fast mode', Boolean, false)
    .action(async (input, output, opts) => {
      try {
        const result = await generatePreview({
          log: console.log,

          input,
          output,

          quality: opts.quality,
          width: opts.width,
          height: opts.height,

          numFrames: opts.numFrames,
          numFramesPercent: opts.numFramesPercent,

          padding: opts.padding,
          margin: opts.margin,
          rows: opts.rows,
          cols: opts.cols,
          color: opts.color,

          gifski: {
            fps: opts.gifFps,
            quality: opts.gifQuality,
            fast: opts.gifFast
          }
        })

        console.log(JSON.stringify(result, null, 2))
      } catch (err) {
        console.error('generate-preview error', err)
        throw err
      }
    })
    .parse(argv)
}
