const _ = require("lodash");

const isOptionalPositiveInteger = (value) => {
  if (_.isNaN(value)) {
    return false;
  }
  if (!value) {
    return true;
  }
  return isPositiveOrZeroInteger(value);
};

const isPositiveOrZeroInteger = (value) => {
  if (_.isInteger(value) && value >= 0) {
    return true;
  }
  return false;
};

const convertStringToBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }
  if (value?.toLowerCase() === "true" || value?.toLowerCase() === "false") {
    return value.toLowerCase() === "true";
  }
  return undefined;
};

const isBoolean = (value) => {
  return _.isBoolean(value);
};

module.exports = {
  isOptionalPositiveInteger,
  isPositiveOrZeroInteger,
  convertStringToBoolean,
  isBoolean,
};
