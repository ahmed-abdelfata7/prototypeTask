module.exports = (error, data) => {
  if (error && error instanceof Array) {
    return {
      success: false,
      errors: error
    };
  } else if (error && error instanceof Array === false) {
    return {
      success: false,
      errors: [error]
    };
  } else {
    return {
      success: true,
      data: data
    };
  }
};
