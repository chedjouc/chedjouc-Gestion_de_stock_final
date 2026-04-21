// Middleware de protection des routes


export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.locals.user = req.session.user;
  next();
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).send("Accès refusé : vous n'avez pas les autorisations nécessaires.");
    }

    res.locals.user = req.session.user;
    next();
  };
};

export const optionalAuth = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};