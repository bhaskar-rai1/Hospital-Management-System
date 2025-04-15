// const Patient = require('../models/Patient');

// exports.getPatients = async (req, res) => {
//   const patients = await Patient.find();
//   res.json(patients);
// };

// exports.addPatient = async (req, res) => {
//   const patient = await Patient.create(req.body);
//   res.status(201).json(patient);
// };

// exports.updatePatient = async (req, res) => {
//   const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(patient);
// };

// exports.deletePatient = async (req, res) => {
//   await Patient.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };


import Patient from '../models/Patient.js';

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
