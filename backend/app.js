const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("./repositories/users");
const userRoute = require("./routes/userRoutes");
const teacherRoute = require("./routes/teacherRoutes");
const studentRoute = require("./routes/studentRoutes");
const { isAuth, JWT_SECRET } = require("./middlerwares/validations");
const loginRoute = require("./routes/loginRoutes");

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretoconñ",
    resave: false,
    saveUninitialized: false,
  }),
);

const port = 3000;

app.get("/", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.status(200).send("El servidor funciona");
});

app.use("/api/users", isAuth, userRoute);
app.use("/api/teachers", isAuth, teacherRoute);
app.use("/api/students", isAuth, studentRoute);
app.use("/login", loginRoute);

app.get("/home", (req, res) => {
  console.log("Datos en la sesión:", req.session.user);
  if (!req.session.isSessionSet) {
    return res.redirect("/login");
  }
  const user = req.session.user;
  if (user.type === "admin") {
    return res.redirect("/users");
  }
  res.render("home", {
    profesor: user,
  });
});

app.get("/users", (req, res, next) => {
  if (!req.session.isSessionSet) {
    return res.redirect("/login");
  }

  const user = req.session.user;

  if (user.type !== "admin") {
    return res.status(401).send("Acceso no autorizado: Solo administradores");
  }

  users
    .getAll()
    .then((u) => {
      res.render("user", {
        u,
      });
    })
    .catch(next);
});

app.post("/logout", (req, res) => {
  delete req.session.isSessionSet;
  res.redirect("/login");
});

app.post("/api/token", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  users
    .getByMail(username)
    .then((user) => {
      if (!user) {
        return res.status(404).send(`EL usuario ${id} no existe`);
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return res.status(401).send("Email o contraseña incorrectos");
        }
        const token = jwt.sign(
          {
            data: {
              username: username,
              type: user.type,
              active: user.active,
              ID: user.id,
            },
          },
          JWT_SECRET,
          {
            expiresIn: "60m",
          },
        );
        res.json({ token: token });
      });
    })
    .catch(next);
});

//handler de error general
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send("Algo ha fallado: " + err.message);
});

app.listen(port, () => {
  console.log(`Example server listening on http://localhost:${port}`);
});
