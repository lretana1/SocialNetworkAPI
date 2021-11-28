const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtsSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // Array of nested documents created with the reactionSchema
            type: [reactionSchema],
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtsSchema.virtual("reactionCount")
    .get(function () {
        return this.reactions.length;
    })

module.exports = model('Thought', thoughtsSchema)