import * as usersDao from "./users-dao.js";


const UsersController = (app) => {
  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };


  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };


  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(403);
      return;
    }
    res.json(currentUser);
  };
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const update = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(404).json({ message: "User not logged in." });
      return;
    }

    const userId = currentUser._id;
    const updates = req.body;

    try {
      // Update the user based on ID
      const result = await usersDao.updateUser(userId, updates);
      const updatedUser = await usersDao.findUserById(userId);

      req.session["currentUser"] = updatedUser;
      res.json({ message: "User updated successfully.", user: updatedUser });

    } catch (error) {
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  };

  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersDao.findUserById(id);
    res.json(user);
  };

  const findUserByUsername = async (req, res) => {
    const name = req.params.name;
    const user = await usersDao.findUserByUsername(name);
    res.json(user);
  };
  const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
    }
  };

  app.get('/api/users', findAllUsers)
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/update", update);
  app.get('/api/users/:id', findUserById);
  app.get('/api/users/name/:name', findUserByUsername);
};
export default UsersController;