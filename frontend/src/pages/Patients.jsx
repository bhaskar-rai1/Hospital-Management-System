import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/style.scss";
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    contact: '',
    bloodGroup: '',
    disease: '',
    admittedDate: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get('/api/patients');
      setPatients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/patients', formData);
      fetchPatients(); // Refresh list
      setFormData({
        name: '',
        age: '',
        gender: '',
        email: '',
        contact: '',
        bloodGroup: '',
        disease: '',
        admittedDate: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="nav-links">
          <span onClick={() => navigate('/patients')}>Patients</span>
          <span onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span onClick={() => navigate('/register')}>Register</span>
          <span onClick={() => navigate('/login')}>Logout</span>
        </div>
      </nav>

      <div className="patient-page">
        {/* Left Side - Registered Patients */}
        <div className="patient-list">
          <h3>Currently Registered Patients</h3>
          {patients.map((patient) => (
            <div className="patient-card" key={patient._id}>
              <p><strong>{patient.name}</strong></p>
              <button className="delete-btn" onClick={() => deletePatient(patient._id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Right Side - Add Patient Form */}
        <div className="add-patient-form">
          <h3>Add Patient</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              required
            />
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="Blood Group"
              required
            />
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              placeholder="Disease"
              required
            />
            <input
              type="date"
              name="admittedDate"
              value={formData.admittedDate}
              onChange={handleChange}
              required
            />
            <button type="submit" className="add-btn">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Patients;


