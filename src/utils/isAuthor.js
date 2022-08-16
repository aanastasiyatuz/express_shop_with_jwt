const isAuthor = (req, res, object) => {
    return object.userId === req.user.id;
};

module.exports = isAuthor;