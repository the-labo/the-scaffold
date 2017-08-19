/**
 * Test case for theScaffold.
 * Runs with mocha.
 */
'use strict'

const theScaffold = require('../lib/the_scaffold.js')
const assert = require('assert')


describe('the-scaffold', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Generate task', async () => {
    await theScaffold('component', `${__dirname}/../tmp/foo/bar-component`, {
      straight: true,
      force: true
    })
  })
})

/* global describe, before, after, it */
