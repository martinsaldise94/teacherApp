const express = require("express");
const students = require("../repositories/students");
const { studentValidation } = require("../middlerwares/validations");
const { validationResult } = require("express-validator");
let router = express.Router();

router.get("/", (req, res) => {
  students.getAll().then((results) => res.json(results));
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un número.",
    });
  }

  students
    .getById(id)
    .then((student) => {
      if (!student) {
        return res.status(404).send(`Estudiante ${id} no existe`);
      }

      res.json(student);
    })
    .catch((err) => next(err));
});

router.post("/", studentValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array().map((err) => err.msg),
    });
  } else {
    students
      .insert(req.body)
      .then((result) => {
        res.json({
          success: true,
          message: "Estudiante guardado",
        });
      })
      .catch((err) => next(err));
  }
});

router.put("/:id", studentValidation, (req, res, next) => {
  const id = Number(req.params.id);
  const data = req.body;
  students
    .update(id, data)
    .then((result) => {
      res.json({ success: true, message: "Estudiante actualizado" });
    })
    .catch((err) => next(err));
});
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const deleted = await students.deleteById(id);
  if (deleted === 0) {
    return res.status(404).send(`Estudiante ${id} no existe`);
  }

  res.send(`Estudiante ${id} eliminado`);
});

module.exports = router;
