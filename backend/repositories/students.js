const db = require("../models");

module.exports = {
  getAll() {
    return db.students.findAll({});
  },
  insert(data) {
    return db.students.create(data);
  },
  getById(id) {
    return db.students.findOne({
      where: { id },
    });
  },

  getByTeacherId(teacher_id) {
    return db.students.findAll({
      where: { teacher_id },
      order: [["date_of_birth"]],
    });
  },
  getByMail(email) {
    return db.students.findOne({
      where: { email },
    });
  },
  async update(id, data) {
    const student = await this.getById(id);
    if (!student) {
      throw new Error(`Student ${id} doesn’t exist`);
    } else {
      return await student.update(data);
    }
  },

  deleteById(id) {
    return db.students.destroy({ where: { id } });
  },
};
