/*
* ErrorParser - Function
* @description: Parse the errors to humanize for the final user
*/

module.exports = function (errors) {
  let parsedErrors = '';
  const stringErrors = [];
  const objectErrors = [];

  /* If errors type isn't Array return parsing error */
  if (!_.isArray(errors)) {
    return 'Error parsing the errors, Array required.';
  }

  /* Diference the String type errors and Object type errors */
  _.each(errors, error => {
    if (typeof error === 'string') {
      stringErrors.push(error);
    } else {
      objectErrors.push(error);
    }
  });

  /* If we only have one string type error use is instead of are */
  if (stringErrors.length === 1) {
    parsedErrors += `${stringErrors[0]} is required.`;
  } else if (stringErrors.length > 1) {
    parsedErrors += `${stringErrors.join(', ')} are required.`;
  }

  /* Parse the object type errors */
  if (objectErrors.length) {
    _.each(objectErrors, value => {
      if (value.error) {
        parsedErrors += ` ${value.error}`;
      }
    });
  }

  return parsedErrors;
};
