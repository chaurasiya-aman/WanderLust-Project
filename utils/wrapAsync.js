const ExpressError = require("./ExpressError.js");

const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err);
      // If err.status is a string, treat it as message; else fallback
      const message =
        typeof err.status === "string"
          ? err.status
          : err.message || "Something went wrong";
      next(new ExpressError(500, message));
    });
  };
};

module.exports =  wrapAsync;
