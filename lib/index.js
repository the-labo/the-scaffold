/**
 * Scaffold for the-projects
 * @module the-scaffold
 */

'use strict'

const theScaffold = require('./the_scaffold')
const tmpls = require('./tmpls.json')

let lib = theScaffold.bind(this)

Object.assign(lib, theScaffold, {
  tmpls,
  theScaffold
})

module.exports = lib
