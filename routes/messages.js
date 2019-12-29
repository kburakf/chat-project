const express = require("express");
const router = express.Router();

const Messages = require("../src/lib/Messages");

router.get("/list", (req, res, next) => {
  setTimeout(
    () =>
      Messages.list(req.query.roomId, messages => {
        res.json(messages);
      }),
    1500
  );
});

module.exports = router;
