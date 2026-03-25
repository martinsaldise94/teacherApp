const db = require("../models");

module.exports = {
  getAll() {
    return db.teachers.findAll({});
  },
  insert(data) {
    return db.teachers.create(data);
  },
  getById(id) {
    return db.teachers.findOne({
      where: { id },
    });
  },

  getByMail(email) {
    return db.teachers.findOne({
      where: { email },
    });
  },
  async update(id, data) {
    const teacher = await this.getById(id);
    if (!teacher) {
      throw new Error(`Teacher ${id} doesn’t exist`);
    } else {
      return await teacher.update(data);
    }
  },

  deleteById(id) {
    return db.teachers.destroy({ where: { id } });
  },
};
