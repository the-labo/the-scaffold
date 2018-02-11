#!/usr/bin/env node
/**
 * Format files before commit
 */
'use strict'

const pon = require('../../Ponfile')
process.chdir(pon.cwd)

const flatten = (r = [], v) => [].concat(r, v)

void async function () {
  const results = await pon.run('format', {disableLogging: true})
  const filenames = Object.values(results).reduce(flatten).reduce((r, v) => [].concat(r, v))
  if (filenames.length > 0) {
    console.error(
      `[COMMIT_REJECTED] Some files are just formatted. Add the changes to git and try again ( ${filenames.join(',')} )`
    )
    process.exit(1)
  }

}()

