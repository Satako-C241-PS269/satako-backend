const { getUserId } = require('../helpers/utility');

const authenticate = (req, res, next) => {
    try {
        const userId = getUserId(req);
        req.user = { id: userId };  // Ensure `id` key is used, matching `req.user.id` used later
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};


module.exports = {
    authenticate
};
