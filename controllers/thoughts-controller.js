const {thoughts, users} = require('../models');

const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        thoughts.find({})
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one thoughts by id
    getThoughtsById({params}, res) {
        thoughts.findOne({_id: params.id})
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create thought
    createThoughts({params, body}, res) {
        console.log(params);
        thoughts.create(body)
            .then(({_id}) => {
                return users.findOneAndUpdate(
                    {_id: params.id},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then(data => {
                console.log(data);
                if (!data) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(data)
            })
            .catch(err => res.json(err));
    },

    // update thought by id
    updateThoughtsById({params, body}, res) {
        thoughts.findOneAndUpdate({_id: params.id}, body, {new: true})
            .then(data => {
                if (!data) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete thought by id
    deleteThoughtsById({params}, res) {
        thoughts.findOneAndDelete({_id: params.id})
            .then(data => {
                if (!data) {
                    res.status(404).json({message: 'No thought found with this id!'});
                    return;
                }
                return users.findOneAndUpdate(
                    {_id: params.id},
                    {$pull: {comments: params.id}},
                    {new: true}
                );
            })
            .then(data => {
                // if (!data) {
                //     res.status(404).json({message: 'No user found with this id!'});
                //     return;
                // }
                res.json(data);
            })
            .catch(err => res.status(400).json(err));
    },
    // add reaction to thought
    addReaction({ params, body }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    // remove reaction to thought
    removeReaction({ params }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;
