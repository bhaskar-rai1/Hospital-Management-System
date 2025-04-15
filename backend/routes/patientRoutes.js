// // routes/patientRoutes.js
// import express from 'express';
// const router = express.Router();
// import Patient from '../models/Patient.js';

// router.get('/', async (req, res) => {
//   const patients = await Patient.find();
//   res.json(patients);
// });

// router.post('/', async (req, res) => {
//   try {
//     const newPatient = new Patient({
//       name: req.body.name,
//       age: req.body.age,
//       gender: req.body.gender,
//       email: req.body.email,
//       contact: req.body.contact,
//       bloodGroup: req.body.bloodGroup,
//       disease: req.body.disease,
//       admittedDate: req.body.admittedDate,
//     });

//     const saved = await newPatient.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.delete('/:id', async (req, res) => {
//   await Patient.findByIdAndDelete(req.params.id);
//   res.json({ msg: 'Deleted' });
// });

// export default router;


import express from 'express';
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
