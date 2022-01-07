const fs = require("fs");
const util = require("util");
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

/**
 * Convert Json file into javascript JSON object
 * @param {string} filePath path to json file
 * @returns {Promise<object>}
 */
exports.readJsonFile = async (filePath) => {
  let rawdata = await readFilePromise(filePath);
  let jsonData = JSON.parse(rawdata);
  return jsonData;
};

/**
 * Write given json data to given file
 * @param {Object} data
 * @param {string} filePath
 * @returns
 */
exports.writeJsonFile = async (data, filePath) => {
  let jsonString = JSON.stringify(data, null, 2);
  await writeFilePromise(filePath, jsonString);
  return filePath;
};

/**
 * Convert Json file into javascript JSON object
 * @param {string} filePath path to json file
 */
 exports.readJsonFileSync = (filePath) => {
  let rawdata = fs.readFileSync(filePath);
  let jsonData = JSON.parse(rawdata);
  return jsonData;
};

/**
 * Write given json data to given file
 * @param {JSON} data
 * @param {string} filePath
 * @returns
 */
 exports.writeJsonFileSync = (data, filePath) => {
  let jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonString);
  return filePath;
};
