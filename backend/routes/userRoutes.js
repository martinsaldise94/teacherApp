const express = require("express");
const users = require("../repositories/users");
const bcrypt = require("bcrypt");
const { userValidation } = require("../middlerwares/validations");
const { validationResult } = require("express-validator");
let router = express.Router();

router.get("/", (req, res) => {
  users.getAll().then((results) => res.json(results));
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un número.",
    });
  }

  users
    .getById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send(`EL usuario ${id} no existe`);
      }

      res.json(user);
    })
    .catch((err) => next(err));
});

router.get("/:id/active", (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      error: "ID inválido",
      message: "El ID debe ser un número.",
    });
  }

  users
    .getById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send(`EL usuario ${id} no existe`);
      }
      res.json({ active: user.active });
    })
    .catch((err) => next(err));
});
router.post("/:id/active", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await users.getById(id);
    if (user.active === true) {
      return res.status(200).send("El usuario ya se encuentra activo");
    }
    const updatedUser = await users.update(id, { active: true });

    res.json({
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
});
router.post("/", userValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      errors: errors.array().map((err) => err.msg),
    });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return users.insert(req.body);
    })
    .then((result) => {
      res.json({
        success: true,
        message: "Usuario guardado con éxito",
      });
    })
    .catch((err) => next(err));
});

router.put("/:id", userValidation, (req, res, next) => {
  const id = Number(req.params.id);
  const data = req.body;
  users
    .update(id, data)
    .then((result) => {
      res.json({ success: true, message: "Usuario actualizado" });
    })
    .catch((err) => next(err));
});
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleted = await users.deleteById(id);
    if (deleted === 0) {
      return res.status(404).send(`Usuario ${id} no existe`);
    }

    res.send(`Usuario ${id} eliminado`);
  } catch {
    if (id) {
      //para esta locura del eror 23503 he ido a pgadmin y manualmente he visto lo que pasa. esto me decía: SQL state: 23503
      return res.status(400).json({
        success: false,
        error: "Restricción de eliminación",
        message:
          "No se puede eliminar: este registro tiene otros datos asociados.",
      });
    }
    next(error);
  }
});

module.exports = router;
