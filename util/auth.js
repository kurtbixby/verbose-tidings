export { isAuthenticated, isAuthenticatedApi };

function isAuthenticated (req, res, next) {
    if (req.session.user && req.session.loggedIn) next();
    else res.redirect('/login');
}

function isAuthenticatedApi (req, res, next) {
    if (req.session.user && req.session.loggedIn) next();
    else res.status(400).json({message: 'Invalid access request'});
}