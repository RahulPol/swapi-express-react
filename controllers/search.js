const axios = require("axios");

const constants = require("../util/constants");
const { parseError } = require("../util/helpers");

const getPage = async (url) => {
  const response = await axios.get(url);
  if (response.statusText == constants.HTTP_OK_TEXT) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
};

const getAllPages = async (url, collection = []) => {
  const response = await getPage(url);
  const { results, next } = response;
  collection = [...collection, ...results];
  if (next !== null) {
    return getAllPages(next, collection);
  }
  return collection;
};

exports.searchPlanets = async (req, res) => {
  try {
    let query = req.query.searchStr;
    const response = await getAllPages(
      constants.SWAPI_BASE_URL + "/planets?search=" + query
    );
    if (!response) {
      return res.send([]);
    }
    res.status(constants.HTTP_OK).send(response);
  } catch (err) {
    res.status(constants.HTTP_EXCEPTION).send(parseError(err));
  }
};
