const index = require("./index");
const auth = require("./auth");
const chat = require("./chat");
const messages = require("./messages");

// middlewares
const isAuthenticated = require("../middleware/isAuthenticated");

module.exports = app => {
  app.use("/", index);
  app.use("/auth", auth);
  app.use("/chat", isAuthenticated, chat);
  app.use("/messages", isAuthenticated, messages);
};
