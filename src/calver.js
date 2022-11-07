const dayjs = require('dayjs')

class Calver {
  async makeVersion(date, options)
  {
    if (!date) {
      throw { message: 'No date has been provided.' };
    }
    if (!options) {
      throw { message: 'No options have been provided.' };
    }
    if (!options.format) {
      throw { message: 'No format string has been provided.' };
    }
    
    // get date parts
    //const dateString = new Date(date).toUTCString();
    //const y = dateString.slice(2, 4);
    //const month = dateString.slice(5, 7);
    //const day = dateString.slice(8, 10);
    
    const dateString = dayjs(date).format(options.format);

    //determine prerelease suffix
    let suffix = "";
    if (options.currentRef != options.defaultBranch){
      suffix = "-" + options.currentRef
        .split("/")[2] // take the third token from the branch ref
        .replace(/[^a-z0-9]/gi, '-') // replace nonalphanumeric chatacters with '-'
        .substr(0,20); //take that first 20 characters
    };

    // concatenate version parts
    let version = options.prefix;
    version += dateString;
    version += "." + options.buildNumber;
    version += suffix;
    return version
  }
}
module.exports = Calver;