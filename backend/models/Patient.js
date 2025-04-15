// // models/Patient.js
// import mongoose from 'mongoose';

// const patientSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   gender: String,
//   email: String,
//   contact: String,
//   bloodGroup: String,
//   disease: String,
//   admittedDate: Date,
// });

// const Patient = mongoose.model("Patient", patientSchema);

// export default Patient;


import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  contact: String,
  bloodGroup: String,
  disease: String,
  admittedDate: Date,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
