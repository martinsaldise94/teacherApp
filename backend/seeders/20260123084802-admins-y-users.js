"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    const contraseñaAdmin = "admin";
    const contraseñaUser = "user";

    const hashAdmin = await bcrypt.hash(contraseñaAdmin, saltRounds);
    const hashUSer = await bcrypt.hash(contraseñaUser, saltRounds);

    return queryInterface.bulkInsert("users", [
      {
        email: "jefe@escuela.com",
        password: hashAdmin,
        type: "admin",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "profe1@escuela.com",
        password: hashUSer,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "profe2@escuela.com",
        password: hashUSer,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "profe3@escuela.com",
        password: hashUSer,
        type: "user",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "profe4@escuela.com",
        password: hashUSer,
        type: "user",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
