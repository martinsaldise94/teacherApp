"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("teachers", [
      {
        dni: "11111111A",
        name: "Marta",
        last_name: "García",
        date_of_birth: "1980-05-10",
        user_id: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "22222222B",
        name: "Roberto",
        last_name: "Sánchez",
        date_of_birth: "1975-10-22",
        user_id: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "33333333C",
        name: "Julián",
        last_name: "ALonso",
        date_of_birth: "1988-01-15",
        user_id: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "44444444D",
        name: "Elena",
        last_name: "Ramírez",
        date_of_birth: "1990-03-12",
        user_id: 4, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "55555555E",
        name: "Ricardo",
        last_name: "Pérez",
        date_of_birth: "1982-07-20",
        user_id: 5, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("teachers", null, {});
  },
};