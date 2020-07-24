const bcrypt = require("bcryptjs");

module.exports = class PasswordHasher {
  constructor() {
    this.rounds = 10;
  }

  async hash(password) {
    return bcrypt.hash(password, this.rounds);
  }

  async check(password, hash) {
    return bcrypt.compare(password, hash);
  }
};
