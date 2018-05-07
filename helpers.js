module.exports = {
    checkLogin: function (req, res, next) {
        console.log(req.session);
        if ((req.session) && (req.session.user)) {
            next();
        } else {
            res.json({ status: 'not authorized' });
            res.status(401);
        }
    }
}