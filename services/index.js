const { Student } = require("../models");
const PasswordHasher = require("./password-hasher");
const { ValidationError, AuthenticationError } = require("../errors");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = class StudentService {
  constructor() {
    this.passwordHasher = new PasswordHasher();
  }

  async registerStudent({ _id, name, city, telephone, birthday, password }) {
    try {
      const hashed_password = await this.passwordHasher.hash(password);

      const new_student = new Student({
        _id,
        name,
        city,
        telephone,
        birthday,
        password: hashed_password
      });

      const student = await new_student.save();
      const token = this.generateAccessToken(student);
      return {
        _id,
        name,
        token
      };
    } catch (e) {
      if (e.name === "MongoError" && e.code === 11000)
        throw new ValidationError(`Duplicate student ID [${_id}]`);
      throw new Error("Internal Server Error");
    }
  }

  generateAccessToken(student) {
    if (!student) {
      throw new ValidationError("Invalid input");
    }
    let studentInfo = student.toJSON();
    let payload = {
      _id: studentInfo._id
    };
    return jwt.sign(payload, config.JWT_SECRET, {
      algorithm: config.SIGN_ALGORITHM,
      issuer: config.TOKEN_ISSUER,
      subject: studentInfo._id,
      expiresIn: config.JWT_EXPIRES_IN
    });
  }

  async signIn({ _id, password }) {
    let student = await this.getStudent(_id, true);
    if (!student) {
      throw new AuthenticationError("Invalid student ID or password");
    }
    const isPasswordMatch = await this.passwordHasher.check(
      password,
      student.password
    );
    if (isPasswordMatch) {
      const token = this.generateAccessToken(student);
      return {
        _id,
        token
      };
    } else {
      throw new AuthenticationError("Invalid student ID or password");
    }
  }

  async getAllStudents() {
    return Student.find({}, "_id name city");
  }

  async getStudent(_id, withPassword = false) {
    return Student.findById(
      _id,
      withPassword
        ? "-__v +password -createdAt -updatedAt"
        : "-__v -password -createdAt -updatedAt"
    );
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
