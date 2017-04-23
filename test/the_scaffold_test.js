/**
 * Test case for theScaffold.
 * Runs with mocha.
 */
'use strict'

const theScaffold = require('../lib/the_scaffold.js')
const assert = require('assert')
const co = require('co')

describe('the-scaffold', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Generate task', () => co(function * () {
    yield theScaffold('component', `${__dirname}/../tmp/foo/bar-component`, {
      straight: true,
      force: true
    })
  }))
})

/* global describe, before, after, it */
