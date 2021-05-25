const { Validator } = require('jsonschema');


module.exports.jsonSchema = (key, schema, opts = {}) => {

  return async (req, res, next) => {
    console.log(req[key]);
    const v = new Validator();
    const { errors } = v.validate(req[key], {
      type: 'object',
      ...schema,
    }, { nestedErrors: true });

    if (errors.length > 0) {
      next({
        expose: true,
        message: 'Validation Error',
        status: 400,
        errors,
      });
      return;
    }

    next();
  }

}