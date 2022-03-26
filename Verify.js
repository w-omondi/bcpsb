function Auth(req, res, next) {
  if (!req.session.user || !req.session.adminPermission) {
    console.log("Authentication failed");
    res.sendFile(__dirname + "/public/Login.html");
  } else {
    return next();
  }
}

module.exports = {
  Auth,
};
