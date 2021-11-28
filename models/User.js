const {Schema, model, Types} = require('mongoose');
const {thoughts} = require("./index");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /\w+@\w+.\w+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    thoughts: {
        // Array of _id values referencing the Thought model
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    friends: {
        // Array of _id values referencing the User model (self-reference)
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false

})

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount")
    .get(function () {
        return this.friends.length
    })


module.exports = model('User', userSchema);


