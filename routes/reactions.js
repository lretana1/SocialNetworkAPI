const {Schema, model} = require('mongoose');



module.exports = model(
    'reactions',
    new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
        },
    })
);

