var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatusSchema = new Schema({
    userID: {
        type: String,
        required: 'User ID is required'
    },
    statusID: {
        type: String,
        required: 'Status ID is required'
    },
    statusData: {
        type: Object,
        required: 'Status Data is required'
    }
});

StatusSchema.pre('save', function (next) {
    // Set the is updated property of the user here

    next();
});

module.exports = mongoose.model('Status', StatusSchema);