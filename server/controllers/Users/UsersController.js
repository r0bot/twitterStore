module.exports = function (dataRepositories) {

    function getAll (req, res) {
        dataRepositories.users.getAll()
            .then(function (users) {
                // TODO: return only the users public part
                res.json(users);
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get all users!'
                });
            });
    }

    function getById (req, res) {
        var id = req.params.id;

        dataRepositoriesRepositories.users.getById(id)
            .then(function (user) {
                res.json(getPublicUser(user));
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot get user by id!'
                });
            });
    }

    function create (req, res) {
        dataRepositories.users.create(req.body)
            .then(function (createdUser) {
                res.json(getPublicUser(createdUser));
            }, function (error) {
                res.render('error', {
                    message: 'Cannot create user!',
                    error: error
                });
            });
    }

    function updateById (req, res) {
        var id = req.params.id;
        var updatesObject = req.body;

        dataRepositories.users.updateById(id, updatesObject)
            .then(function (updatedUser) {
                res.json(getPublicUser(updatedUser));
            }, function (error) {
                res.render('error', {
                    error: error,
                    message: 'Cannot update user by id!'
                });
            });
    }


    return {
        getAll: getAll,
        getById: getById,
        create: create,
        updateById: updateById
    }
};

