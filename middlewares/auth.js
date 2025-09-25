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

module.exports = { ensureAuth, ensureGuest };
