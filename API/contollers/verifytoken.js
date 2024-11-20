const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Read the token from cookies
    
    if (token) {
        jwt.verify(token, process.env.JWT_ACCESSTOKEN, (err, user) => {
            if (err) {
                res.status(403).json({ error: "Token is not valid!" });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({ error: "You are not authenticated!" });
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => { 
        if (req.user.idUSER == req.params.idUSER || req.user.userRole === 'admin') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndAuthorizationA_C = (req, res, next) => {
    verifyToken(req, res, () => { 
        if (req.user.userRole === 'client' || req.user.userRole === 'admin') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndAuthorizationA_S = (req, res, next) => {
    verifyToken(req, res, () => { 
        if (req.user.userRole === 'seller' || req.user.userRole === 'admin') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndSeller = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userRole === 'seller') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndAdminandSeller = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userRole === 'seller' || req.user.userRole === 'admin') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userRole === 'admin') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

const verifyTokenAndClient = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userRole === 'client') {
            next();
        } else {
            res.status(403).json({ error: "You are not allowed to do that!" });
        }
    });
};

module.exports = {verifyTokenAndClient,verifyTokenAndSeller,verifyTokenAndAuthorizationA_S, verifyTokenAndAuthorizationA_C, verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin ,verifyTokenAndAdminandSeller };