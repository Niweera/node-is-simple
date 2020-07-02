const { Student } = require("../models");

module.exports = class StudentService {
  async registerStudent(data) {
    const { _id, name, city, telephone, birthday } = data;

    const new_student = new Student({
      _id,
      name,
      city,
      telephone,
      birthday
    });

    const response = await new_student.save();
    const res = response.toJSON();
    delete res.__v;
    return res;
  }

  async getAllStudents() {
    return Student.find({}, "_id name city");
  }

  async getStudent(_id) {
    return Student.findById(_id, "-__v -createdAt -updatedAt");
  }

  async updateStudent(_id, { name, city, telephone, birthday }) {
    return Student.findOneAndUpdate(
      { _id },
      {
        name,
        city,
        telephone,
        birthday
      },
      {
        new: true,
        omitUndefined: true,
        fields: "-__v -createdAt -updatedAt"
      }
    );
  }

  async deleteStudent(_id) {
    await Student.deleteOne({ _id });
    return { message: `Student [${_id}] deleted successfully` };
  }
};
