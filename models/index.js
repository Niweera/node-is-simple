const mongoose = require("../database");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    _id: {
      type: mongoose.SchemaTypes.String,
      unique: true,
      required: true,
      index: true
    },
    name: { type: mongoose.SchemaTypes.String, required: true },
    city: { type: mongoose.SchemaTypes.String, required: true },
    telephone: { type: mongoose.SchemaTypes.Number, required: true },
    birthday: { type: mongoose.SchemaTypes.Date, required: true }
  },
  { strict: true, timestamps: true, _id: false }
);

const collectionName = "student";

const Student = mongoose.model(collectionName, studentSchema, collectionName);

module.exports = {
  Student
};
