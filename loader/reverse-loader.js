// const fs = require("fs");
// const loaderUtils = require("loader-utils");

module.exports = function(source) {
  if (source) {
    console.log("--- reverse-loader input:", source);
    source = source
      .split("")
      .reverse()
      .join("");
    console.log("--- reverse-loader output:", source);
  }
  return source;
};
