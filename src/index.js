const core = require('@actions/core');
const github = require('@actions/github');
const CalVer = require('./calver.js')

async function run() {
  try {
    let options = {
      defaultBranch: core.getInput('default_branch'),
      currentRef: github.context.ref,
      buildNumber: github.context.runNumber,
      prefix: core.getInput('version_prefix'),
    };
    const date = new Date().toISOString();
    const calver = new CalVer();
    const v = await calver.getVersion(date, options)
    
    core.exportVariable('PACKAGE_VERSION', v.toString())
    core.setOutput('package_version', v.toString())
    

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()