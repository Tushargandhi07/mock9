const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (!token) {
            res.status(400).send({ "msg": "Login first" });
        }
        else {
            let decoded = jwt.verify(token, "tushar");
            req.user = decoded.userID;
            next();
        }


    } catch (error) {
        console.log(error.message);
        res.status(400).send({ "msg": "Sometyhing went wrong" });
    }
};

module.exports = {
    authentication
}