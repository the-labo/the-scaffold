#!/usr/bin/env node

/**
 * Tmplify prototype.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const path = require('path')
const fs = require('fs')
const apeTasking = require('ape-tasking')
const filemode = require('filemode')
const tmplconv = require('tmplconv')
const demos = require('../demos')

let prefix = '~~~~'
let suffix = '~~~~'
apeTasking.runTasks('tmplify', [
  async () => {
    for (let type of Object.keys(demos)) {
      let demoName = demos[type]
      let demoDir = path.dirname(require.resolve(`${demoName}/package.json`))
      let demoPkg = require(`${demoName}/package.json`)
      let tmplDir = `assets/tmpl/${type}`
      await tmplconv.tmplify(demoDir, tmplDir, {
        clean: true,
        mode: '444',
        pattern: [
          '**/*.*',
          '.*',
          '.*.bud',
          '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/.*.bud',
          '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/**/.*.bud',
          '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/.*.hbs',
          '+(assets|bin|conf|doc|docs|example|tests|client|server|utils|src|lib|test)/**/.*.hbs'
        ],
        ignore: [
          '.DS_Store',
          '.svg',
          'ci/demo.js',
          'node_modules/**/*.*',
          '**/*.map'
        ],
        data: Object.assign({
          'github_repository': (demoPkg.repository.url || '').split(/\//g).slice(-2).join('/').replace(/\.git$/, ''),
          'package_name': demoPkg.name,
          'package_description': demoPkg.description,
          'author_name': demoPkg.author.name,
          'author_email': demoPkg.author.email,
          'author_url': demoPkg.author.url,
        }, require('../lib/data')[type] || {}),
        prefix,
        suffix
      })
      await tmplconv.tmplify(`${__dirname}/..`, tmplDir, {
        pattern: [
          '.gitignore'
        ],
        prefix,
        suffix
      })

      // Modify package.json
      {
        let filename = `${tmplDir}/package.json.tmpl`
        let str = fs.readFileSync(filename).toString()
        let pkg = JSON.parse(str)
        fs.chmodSync(filename, '644')
        let newPkg = {
          name: pkg.name,
          version: '1.0.0',
          description: pkg.description,
          main: pkg.main,
          browser: pkg.browser,
          bin: pkg.bin,
          scripts: pkg.scripts,
          repository: pkg.repository.url.split(/\//g).slice(-1).join('/').replace(/\.git$/, ''),
          keywords: pkg.keywords,
          author: pkg.author,
          license: pkg.license,
          bugs: pkg.bugs,
          homepage: pkg.homepage,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies,
          peerDependencies: pkg.peerDependencies,
          engines: pkg.engines,
          publishConfig: pkg.publishConfig
        }
        for (let name of Object.keys(newPkg)) {
          if (!newPkg[name]) {
            delete newPkg[name]
          }
        }
        fs.writeFileSync(filename, JSON.stringify(newPkg, null, 2))
        await filemode(filename, '444')
      }
    }
  }
], true)
