const jwt = require("jsonwebtoken");

//Set token secret and expiration date
const secret = "mysecrets";
const expiration = "2h";

module.exports = {
    //function for our authenticated routes
    authMiddleware: function ({ req }) {
        //allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization || req.body.token;

        // ["Bearer", tokenvaluse"]
        if (req.headers.authorization) {
            token - token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        //Verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.acoount = data;
        } catch (err) {
            console.log(`Auth Error: ${err.message}`);
        }

        //next endpoint
        return req;
    },
    signToken: function ({ email, _id, user }) {
        const payload = {
            email,
            accountId: _id,
            userId: user?.__id,
            isAdmin: user?.isAdmin,
            companyId: user?.userCompany?.__id,
        };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};