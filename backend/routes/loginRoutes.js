const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../repositories/users");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  users
    .getByMail(username)
    .then((user) => {
      if (!user) {
        return res.render("error-login", {
          mensaje: "Email o contraseña erróneos",
        });
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res.render("error-login", {
            mensaje: "Email o contraseña erróneos",
          });
        }
        req.session.isSessionSet = true;
        req.session.user = user; // no me entraba el como hacer esto y le he preguntado a chatgpt=( perdon
        return res.redirect("/home");
      });
    })
    .catch(next);
});

module.exports = router;
