const { users, thoughts} = require('../models');

const usersController = {
    // get all users
    getAllUsers(req, res) {
        users.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user by id
    getUserById({params}, res) {
        users.findOne({_id: params.id})
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create user
    createUser({body}, res) {
        users.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

    // update user by id
    updateUserById({params, body}, res) {
        users.findOneAndUpdate({_id: params.id}, body, {new: true})
            .then(data => {
                if (!data) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user by id
    deleteUserById({params}, res) {
        users.findOneAndDelete({_id: params.id})
            .then(data => {
                if (!data) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    //add friend by id
    addFriendById({params}, res) {
        users.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
            .then(data => {
                if (!data) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err))
    },
    //remove friend by id
    deleteFriendById({params}, res) {
        users.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
            .then(data => res.json(data))
            .catch(err => res.json(err));


    }
};

module.exports = usersController;
