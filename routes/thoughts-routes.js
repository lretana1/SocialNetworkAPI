const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughtsById,
    deleteThoughtsById,
    addReaction,
    removeReaction

} = require('../controllers/thoughts-controller')

router
    .route('/')
    .get(getAllThoughts)

// api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughtsById)
    .delete(deleteThoughtsById)

// api/thoughts/:userId
router
    .route('/:id')
    .post(createThoughts)

// api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// api/comments/:thoughtId/:reactionId
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);


module.exports = router;