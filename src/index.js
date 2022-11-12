const core = require('@actions/core');
const github = require('@actions/github');
const Calver = require('./calver.js');

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
    const calver = new Calver(dateValue, options);
    await calver.makeVersion();

    core.exportVariable('PACKAGE_VERSION', calver.VersionFull);
    core.setOutput('package_version', calver.VersionFull);

    core.exportVariable('PACKAGE_SUFFIX', calver.PrereleseSuffix);
    core.setOutput('package_suffix', calver.PrereleseSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
