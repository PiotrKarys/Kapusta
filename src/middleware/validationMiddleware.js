const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid data format" });
    }
    next();
  };
};

module.exports = {
  validateBody,
};
