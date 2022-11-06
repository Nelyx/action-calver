class CalVer {
  async getVersion(date, options)
  {
    if (!date) {
      throw { message: 'No date has been provided.' };
    }
    if (!options) {
      throw { message: 'No options have been provided.' };
    }
    
    const dateString = new Date(date).toISOString();

    // get date parts
    const year = dateString.slice(2, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);

    //determine prerelease suffix
    let suffix = "";
    if (options.currentRef != options.defaultBranch){
      suffix = "-" + options.currentRef.split("/")[2]
    };

    // concatenate version parts
    let v = options.prefix;
    v += year;
    v += '.' + month; 
    v += '.' + day;
    v += "." + options.buildNumber;
    v += suffix;
    return v
  }
}
module.exports = CalVer;