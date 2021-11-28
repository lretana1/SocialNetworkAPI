const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendById,
    deleteFriendById
} = require('../controllers/users-controller')

// api/users/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// api/users/id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

// api/users/:userId/friends/:friendId

router
    .route('/:userId/friends/:friendId')
    .post(addFriendById)
    .delete(deleteFriendById)

module.exports = router;
