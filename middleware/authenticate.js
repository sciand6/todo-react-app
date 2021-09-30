module.exports = (req, res, next) => {
  let authorization = "";

  if (req.headers["msiou-auth"]) {
    authorization = req.headers["msiou-auth"];
    if (authorization === process.env.PASSWORD) {
      next();
    } else {
      return res.status(403).json({ msg: "You must be logged in." });
    }
  } else {
    return res.status(403).json({ msg: "Missing authorization header." });
  }
};
