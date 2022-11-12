const dayjs = require('dayjs');

class Calver {
  get VersionShort() {
    return this._versionShort;
  }
  get VersionFull() {
    return this._versionFull;
  }
  get PrereleseSuffix() {
    return this._prereleaseSuffix;
  }
  constructor(_date, _options) {
    if (!_date) {
      throw { message: 'No date has been provided.' };
    }
    if (!_options) {
      throw { message: 'No options have been provided.' };
    }
    if (!_options.format) {
      throw { message: 'No format string has been provided.' };
    }
    this._date = _date;
    this._options = _options;

    this._versionShort = '';
    this._versionFull = '';
    this._prereleaseSuffix = '';
  }
  async makeVersion() {
    const _date = this._date;
    const _options = this._options;
    // get date parts

    const dateString = dayjs(_date).format(_options.format);
    //determine prerelease suffix
    let suffix = '';
    if (_options.currentRef != _options.defaultBranch) {
      suffix = _options.currentRef
        .split('/')[2] // take the third token from the branch ref
        .replace(/[^a-z0-9]/gi, '-') // replace nonalphanumeric chatacters with '-'
        .substr(0, 20); //take that first 20 characters
    }

    // concatenate version parts
    let vs = _options.prefix;
    vs += dateString;
    vs += '.' + _options.buildNumber;

    let vf = vs + (!suffix ? '' : '-' + suffix);

    this._versionShort = vs;
    this._versionFull = vf;
    this._prereleaseSuffix = suffix;
  }
}
module.exports = Calver;
