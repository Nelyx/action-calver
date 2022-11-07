const core = require('@actions/core');
const github = require('@actions/github');
const Calver = require('./calver.js')


async function run() {
  try {
    const options = {
      defaultBranch: core.getInput('default_branch'),
      currentRef: github.context.ref,
      buildNumber: github.context.runNumber,
      prefix: core.getInput('version_prefix'),
      format: core.getInput('format'),
    };
    const dateValue = new Date().toUTCString();
    const calver = new Calver();
    const v = await calver.makeVersion(dateValue, options)
    
    core.exportVariable('PACKAGE_VERSION', v.toString())
    core.setOutput('package_version', v.toString())
    

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()