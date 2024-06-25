

const generateMiddleWare = (schema) => {
    return (req, res, next) => {
      // Middleware logic
      if (schema) {
        const result = schema.validate(req.body);
        console.log("validator", result);
        if (result.error) {
          console.log(result.error)
          return res
            .status(422)
            .json({ message: "Validation error", errors: result.error.message });
        }
    }
      next();
    };
  };
  

  module.exports = generateMiddleWare