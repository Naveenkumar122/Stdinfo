require('rootpath')();
const config = require('config.json');
const mongoose = require('mongoose');
const model = require('database/model.js')

mongoose.connect(config.connect,{ useCreateIndex: true,useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = {
    User: model.User,
    State: model.State,
    Profiles: model.Profiles,
    Department: model.Department,
    Country:model.Country
};
