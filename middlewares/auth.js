function ensureAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
}

function ensureGuest(req, res, next) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
}
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/auth/login");
}

module.exports = { ensureAuth, ensureGuest, isAuthenticated };
