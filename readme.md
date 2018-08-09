# ffmpeg-generate-video-preview

> Generates an attractive image strip or GIF preview from a video.

[![NPM](https://img.shields.io/npm/v/ffmpeg-generate-video-preview.svg)](https://www.npmjs.com/package/ffmpeg-generate-video-preview) [![Build Status](https://travis-ci.com/transitive-bullshit/ffmpeg-generate-video-preview.svg?branch=master)](https://travis-ci.com/transitive-bullshit/ffmpeg-generate-video-preview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

Example 6x5 image strip preview (video credit [Big Buck Bunny](https://peach.blender.org/download/)).

![Image Strip Example](https://raw.githubusercontent.com/transitive-bullshit/ffmpeg-generate-video-preview/master/media/big-buck-bunny-6x5.jpg)

```sh
generate-video-preview big-buck-bunny.avi output.jpg --width 160 --rows 5 --cols 6
```

---

Example 6x5 image strip preview with black padding and margin.

![Image Strip Example with Padding](https://raw.githubusercontent.com/transitive-bullshit/ffmpeg-generate-video-preview/master/media/big-buck-bunny-6x5-padding.jpg)

```sh
generate-video-preview big-buck-bunny.avi output.jpg --width 160 --rows 5 --cols 6 --padding 4 --margin 4
```

---

Example gif preview with 30 frames at 4 fps.

![GIF Example](https://raw.githubusercontent.com/transitive-bullshit/ffmpeg-generate-video-preview/master/media/big-buck-bunny-30.gif)

```sh
generate-video-preview big-buck-bunny.avi output.gif --width 320 --num-frames 30 --gif-fps 4
```

---

## Install

```bash
npm install --save ffmpeg-generate-video-preview

# or if you want to use the CLI
npm install -g ffmpeg-generate-video-preview
```

This module requires [ffmpeg](http://ffmpeg.org/) to be installed.

If you want to generate GIFs, you must also install [gifski](https://gif.ski/). On Mac OS, you can run

```sh
brew install gifski
```

## CLI

```sh
  Usage: generate-video-preview [options] <input> <output>

  Options:

    -V, --version                 output the version number
    -w, --width <width>           frame width
    -h, --height <height>         frame height
    -q, --quality <n>             frame image quality
    -n, --num-frames <n>          number of frames to capture
    -p, --num-frames-percent <n>  number of frames to capture as % of overall frames
    -P, --padding <n>             image strip tile padding (default: 0)
    -M, --margin <n>              image strip border margin (default: 0)
    -r, --rows <n>                image strip number of rows
    -c, --cols <n>                image strip number of cols
    -C, --color <color>           image strip background color (default: Black)
    -f, --gif-fps <n>             gifski fps (default: 10)
    -Q, --gif-quality <n>         gifski quality (default: 80)
    -F, --gif-fast                enable gifski fast mode
    -h, --help                    output usage information
```

## Usage

```js
const generatePreview = require('ffmpeg-generate-video-preview')

const metadata = await generatePreview({
  input: 'media/1.mp4',
  output: 'preview.gif',
  width: 128
})

console.log(metadata)
// => {
//   output: 'preview.gif',
//   numFrames: 5,
//   width: 128,
//   height: 72
// }
```

## API

### generatePreview(options)

Generates a preview image strip or GIF from a video file. Returns a `Promise` for when the output file(s) have been written.

Note that some options only target image strips, and some only target GIFs.

#### options

##### input

Type: `String`

Path or URL to a video file.

##### output

Type: `String`

Path to a `jpg`, `png`, or `gif` file to output. If `output` is a `gif`, then a GIF will be created via `gifski`; otherwise, an image strip will be generated according to `rows` and `cols`.

##### width

Type: `Number`

Scales the input to the specified width. If `height` isn't specified, the aspect ratio of the input will be preserved.

##### height

Type: `Number`

Scales the input to the specified height. If `width` isn't specified, the aspect ratio of the input will be preserved.

##### quality

Type: `Number`
Default: `2`

If exporting a jpeg image, the quality from 1-31 with 31 being the worst quality ([source](https://stackoverflow.com/questions/10225403/how-can-i-extract-a-good-quality-jpeg-image-from-an-h264-video-file-with-ffmpeg)).

If exporting a GIF, this will dictate the image quality of the intermediate frames, not the final output gif quality. Also see `gifski.quality`.

##### numFrames

Type: `Number`

Specify an exact number of frames to capture. Note that if you specify `rows` and `cols` for image strips, this value will be overridden.

##### numFramesPercent

Type: `Number`
Default: `0.05`

Specify a percentage of frames to capture as a floating point number between 0 and 1. Defaults to 5%. Note that if you specify `numFrames` or `rows` and `cols` for image stripsgifs, this value will be overridden.

##### rows

Type: `Number`
Default: `1`
(*Image Strips Only)*

Number of rows to generate in an image strip. See the ffmpeg [tile filter](https://ffmpeg.org/ffmpeg-filters.html#tile) for details.

Defaults to one long horizontal image strip with one row.

##### cols

Type: `Number`
(*Image Strips Only)*

Number of columns to generate in an image strip. See the ffmpeg [tile filter](https://ffmpeg.org/ffmpeg-filters.html#tile) for details.

Note that if `cols` isn't specified, it will be inferred. Also note that specifying both `rows` and `cols` is the easiest way to specify the number of frames to generate in an image strip.

##### padding

Type: `Number`
Default: `0`
(*Image Strips Only)*

Adds a padding between each image in an image strip. See the ffmpeg [tile filter](https://ffmpeg.org/ffmpeg-filters.html#tile) for details.

##### margin

Type: `Number`
Default: `0`
(*Image Strips Only)*

Adds an outer margin to an image strip. See the ffmpeg [tile filter](https://ffmpeg.org/ffmpeg-filters.html#tile) for details.

##### color

Type: `String`
Default: `Black`
(*Image Strips Only)*

Background color for unused areas of the image strip. May be any valid ffmpeg [color syntax string](https://ffmpeg.org/ffmpeg-utils.html#color-syntax).

##### gifski

Type: `Object`
Default: `{ fps: 10, quality: 80, fast: false }`
(*GIFs Only)*

[Gifski](https://gif.ski/) customization options. Run `gifski -h` for details.

##### log

Type: `Function`
Default: `noop`

Optional function to log the underlying ffmpeg and gifski command(s). You may, for example, use `console.log`

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) - A fluent API to [FFmpeg](http://ffmpeg.org/).
- [gifski](https://gif.ski/) - High quality GIF encoder.
- [ffmpeg tutorial](https://www.binpress.com/tutorial/how-to-generate-video-previews-with-ffmpeg/138) - Related blog post by Martin Sikora from 2014.
- [ffmpeg-extract-frames](https://github.com/transitive-bullshit/ffmpeg-extract-frames) - Extracts frames from a video using [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).
- [awesome-ffmpeg](https://github.com/transitive-bullshit/awesome-ffmpeg) - A curated list of awesome ffmpeg resources with a focus on JavaScript.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
