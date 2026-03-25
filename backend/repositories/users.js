const db = require("../models");

module.exports = {
  getAll() {
    return db.users.findAll({});
  },
  insert(data) {
    return db.users.create(data);
  },
  getById(id) {
    return db.users.findOne({
      where: { id },
    });
  },

  getByMail(email) {
    return db.users.findOne({
      where: { email },
    });
  },
  async update(id, data) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error(`User ${id} doesn’t exist`);
    } else {
      return await user.update(data);
    }
  },

  deleteById(id) {
    return db.users.destroy({ where: { id } });
  },
};
