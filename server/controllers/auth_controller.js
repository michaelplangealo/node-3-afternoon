const users = require("../models/users");
let id = 1;

module.exports = {
  // This method should use username and password from the request body to find a user object in the users array with the same user/pass combination. If it finds a user with that combination, it should update the value of username on the request session's user object to value of username from the request body.
  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;
    console.log(username, password);
    const user = users.find(
      user => user.username === username && user.password === password
    );
    console.log(user);

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    }
  },
  // This method should look for a username and password on the request body and then create a user object. It should use the global id variable for the id. After pushing the new user object to the users array it should increment the value of id by one so we can keep the value of id unique. It should then set the value of username on the request session's user object to the value of username from the request body.
  register: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;
    res.status(200).send(session.user);
  },
  // This method is responsible for destroying the session and returning the session ( which should be undefined at that point ).
  signout: (req, res, next) => {
    const { session } = req;
    // console.log(session);

    session.destroy();
    // console.log(session);

    res.status(200).send(req.session);
  },
  // This method is responsible for reading the user object off of session and return it with a status of 200.
  getUser: (req, res, next) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
