const express = require("express");
const teachers = require("../repositories/teachers");
const students = require("../repositories/students");
const users = require("../repositories/users");
const { teacherValidation } = require("../middlerwares/validations");
const { validationResult } = require("express-validator");
let router = express.Router();

router.get("/", (req, res) => {
  teachers.getAll().then((results) => res.json(results));
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un número.",
    });
  }

  teachers
    .getById(id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).send(`Profesor ${id} no existe`);
      }

      res.json(teacher);
    })
    .catch((err) => next(err));
});

router.get("/:id/students", (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un número.",
    });
  }
  teachers
    .getById(id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(401).send(`Profesor ${id} no existe`);
      }
      return users.getById(teacher.user_id);
    })
    .then((user) => {
      if (user.active === false) {
        return res.status(401).send(`EL profesor está inactivo`);
      }
      return students.getByTeacherId(id);
    })
    .then((lista) => {
      if (!lista || lista === 0) {
        return res.status(404).send("No hay alumnos asociados a este profesor");
      }

      res.json(lista);
    })
    .catch((err) => next(err));
});
router.post("/", teacherValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array().map((err) => err.msg),
    });
  } else {
    teachers
      .insert(req.body)
      .then((result) => {
        res.json({
          success: true,
          message: "Profesor guardado",
        });
      })
      .catch((err) => next(err));
  }
});

router.put("/:id", teacherValidation, (req, res, next) => {
  const id = Number(req.params.id);
  const data = req.body;
  teachers
    .update(id, data)
    .then((result) => {
      res.json({ success: true, message: "Profesor actualizado" });
    })
    .catch((err) => next(err));
});
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleted = await teachers.deleteById(id);
    if (deleted === 0) {
      return res.status(404).send(`Profesor ${id} no existe`);
    }

    res.send(`Profesor ${id} eliminado`);
  } catch {
    if (id) {
      return res.status(400).json({
        success: false,
        error: "Restricción de eliminación",
        message:
          "No se puede eliminar: este registro tiene otros datos asociados.",
      });
    }
  }
});

module.exports = router;
