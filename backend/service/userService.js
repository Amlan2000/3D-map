const User = require("../models/user");


async function getUsers()
{
    const Users = await User.find({});
    return Users;
};

module.exports = {getUsers};
