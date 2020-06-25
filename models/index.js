const mongoose = require("../database");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: mongoose.SchemaTypes.String },
    city: { type: mongoose.SchemaTypes.String }
  },
  { strict: true, timestamps: true }
);

const collectionName = "student";

const Student = mongoose.model(collectionName, studentSchema, collectionName);

module.exports = {
  Student
};
