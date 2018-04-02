'use strict'

const { test } = require('ava')
const path = require('path')
const sharp = require('sharp')
const tempy = require('tempy')

const generatePreview = require('.')

const fixturesPath = path.join(__dirname, '..', `media`)
const input0 = path.join(fixturesPath, '0.mp4')
const input1 = path.join(fixturesPath, '1.mp4')
const input2 = path.join(fixturesPath, '2.mp4')

test('preview image strip - jpg', async (t) => {
  const output = tempy.file({ extension: 'jpg' })
  const metadata = await generatePreview({
    log: console.log,
    input: input0,
    output,
    width: 320
  })

  t.deepEqual(metadata, {
    output,
    width: 320,
    height: 180,
    numFrames: 5,
    rows: 1,
    cols: 5,
    padding: 0,
    margin: 0
  })

  const image = await sharp(output).metadata()
  t.is(image.width, 320 * 5)
  t.is(image.height, 180)
  t.is(image.channels, 3)
  t.is(image.format, 'jpeg')
})

test('preview image strip 3x2 - png', async (t) => {
  const output = tempy.file({ extension: 'png' })
  const metadata = await generatePreview({
    log: console.log,
    input: input1,
    output,
    height: 72,
    rows: 2,
    padding: 2,
    margin: 16
  })

  t.deepEqual(metadata, {
    output,
    width: 128,
    height: 72,
    numFrames: 5,
    rows: 2,
    cols: 3,
    padding: 2,
    margin: 16
  })

  const image = await sharp(output).metadata()
  t.is(image.width, 128 * 3 + 16 * 2 + 2 * 2)
  t.is(image.height, 72 * 2 + 16 * 2 + 2 * 1)
  t.is(image.channels, 3)
  t.is(image.format, 'png')
})

test('preview image strip 1x7 - jpg', async (t) => {
  const output = tempy.file({ extension: 'jpg' })
  const metadata = await generatePreview({
    log: console.log,
    input: input1,
    output,
    width: 128,
    rows: 7,
    cols: 1
  })

  t.deepEqual(metadata, {
    output,
    width: 128,
    height: 72,
    numFrames: 7,
    rows: 7,
    cols: 1,
    padding: 0,
    margin: 0
  })

  const image = await sharp(output).metadata()
  t.is(image.width, 128)
  t.is(image.height, 72 * 7)
  t.is(image.channels, 3)
  t.is(image.format, 'jpeg')
})

// TODO: add CI support for gif creation
if (!process.env.CI) {
  test('preview gif', async (t) => {
    const output = tempy.file({ extension: 'gif' })
    const metadata = await generatePreview({
      log: console.log,
      input: input2,
      output,
      width: 320
    })

    t.deepEqual(metadata, {
      output,
      width: 320,
      height: 180,
      numFrames: 5
    })

    const image = await sharp(output).metadata()
    t.is(image.width, 320)
    t.is(image.height, 180)
    t.is(image.channels, 4)
    t.is(image.format, 'gif')
  })
}
