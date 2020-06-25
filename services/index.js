const { Student } = require("../models");

module.exports = class StudentService {
  async registerStudent(data) {
    const { name, city } = data;

    const new_student = new Student({
      name,
      city
    });

    const response = await new_student.save();
    const res = response.toJSON();
    delete res.__v;
    return res;
  }
};
