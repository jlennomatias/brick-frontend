const DotEnv = require("dotenv");
const parsedEnv = DotEnv.config().parsed;

module.exports = function () {
  const result = {};

  for (const key in parsedEnv) {
    result[key] = parsedEnv[key];
  }
  return result;
};
