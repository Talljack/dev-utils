import { execSync } from 'child_process'
import fs from 'fs'
import { createRequire } from 'module'
import updatelog from './updatelog.mjs'

const require = createRequire(import.meta.url)

async function release() {
  const flag = process.argv[2]
  const packageJson = require('../package.json')
  // major.minor.patch
  let [a, b, c] = packageJson.version.split('.')
  if (flag === 'major') {
    a++
    b = 0
    c = 0
  } else if (flag === 'minor') {
    b++
    c = 0
  } else if (flag === 'patch') {
    c++
  } else {
    console.error('Invalid flag')
    process.exit(1)
  }
  const newVersion = `${a}.${b}.${c}`
  packageJson.version = newVersion
  const nextTag = `v${newVersion}`
  await updatelog(nextTag, 'release')
  fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 2))
  // commit
  execSync('git add ../package.json ../UPDATE_LOG.md')
  execSync(`git commit -m "release: ${nextTag}"`)
  execSync(`git tag -a ${nextTag} -m "release: ${nextTag}"`)
  execSync('git push')
  execSync(`git push origin ${nextTag}`)
  console.log(`Successfully Release: ${nextTag}`)
}

release().catch(error => {
  console.error(error)
})
