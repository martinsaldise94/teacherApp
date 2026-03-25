const { body, validationResult } = require("express-validator");
const users = require("../repositories/users");
const teachers = require("../repositories/teachers");
const students = require("../repositories/students");
const jwt = require("jsonwebtoken");

const userValidation = [
  body("email")
    .notEmpty()
    .withMessage("mail obligatorio")
    .isEmail()
    .withMessage("mail inválido"),
  body("password").notEmpty().withMessage("INtroduzca una contraseña válida"),
  body("email").custom(async (email) => {
    const user = await users.getByMail(email);
    if (user) {
      throw new Error("email ya en uso");
    }
    return true;
  }),
];

const teacherValidation = [
  body("dni")
    .isLength({ min: 9, max: 9 })
    .withMessage("El dni debe tener 9 caracteres")
    .notEmpty()
    .withMessage(" dni incorrecto"),
  body("name").notEmpty().withMessage("nombre incorrecto"),
  body("last_name").notEmpty().withMessage(" apellido incorrecto"),
  body("date_of_birth")
    .isDate()
    .withMessage("fecha inválida. (debe ser YYYY-MM-DD)")
    .notEmpty()
    .withMessage("fecha incorrecta"),
  body("user_id").notEmpty().withMessage("Necesita un usuario asociado"),
];

const studentValidation = [
  body("dni")
    .isLength({ min: 9, max: 9 })
    .withMessage("El dni debe tener 9 caracteres")
    .notEmpty()
    .withMessage(" dni incorrecto"),
  body("name").notEmpty().withMessage("nombre incorrecto"),
  body("last_name").notEmpty().withMessage(" apellido incorrecto"),
  body("date_of_birth")
    .isDate()
    .withMessage("fecha inválida. (debe ser YYYY-MM-DD)")
    .notEmpty()
    .withMessage("fecha incorrecta"),
  body("teacher_id").notEmpty().withMessage("Necesita un profesor asociado"),
];

const JWT_SECRET = "ClaveMegaSecreta";

const isAuth = (req, res, next) => {
  console.log("Clave usada para validar:", JWT_SECRET);
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authorization Header missing",
    });
  }
  let authorization = req.headers.authorization;
  let token = authorization.split(" ")[1];
  let jwtData;
  try {
    jwtData = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
  req.data = jwtData.data;
  next();
};

module.exports = {
  userValidation,
  studentValidation,
  teacherValidation,
  isAuth,
  JWT_SECRET
};
