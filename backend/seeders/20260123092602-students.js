"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("students", [
      {
        dni: "10000001A",
        name: "Lucas",
        last_name: "Pérez",
        date_of_birth: "2015-03-12",
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000002B",
        name: "Sofía",
        last_name: "Ruiz",
        date_of_birth: "2014-07-22",
        teacher_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000003C",
        name: "Mateo",
        last_name: "Gómez",
        date_of_birth: "2016-01-10",
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000004D",
        name: "Valeria",
        last_name: "López",
        date_of_birth: "2015-11-05",
        teacher_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000005E",
        name: "Daniel",
        last_name: "Torres",
        date_of_birth: "2014-05-30",
        teacher_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000006F",
        name: "Lucía",
        last_name: "Marín",
        date_of_birth: "2016-08-14",
        teacher_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000007G",
        name: "Hugo",
        last_name: "Sanz",
        date_of_birth: "2015-02-25",
        teacher_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000008H",
        name: "Martina",
        last_name: "Castro",
        date_of_birth: "2014-12-12",
        teacher_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dni: "10000009I",
        name: "Leo",
        last_name: "Ortiz",
        date_of_birth: "2015-06-18",
        teacher_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("students", null, {});
  },
};
