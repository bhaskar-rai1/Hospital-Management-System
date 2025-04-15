// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/style.scss";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [patients, setPatients] = useState([]);
//   const [editMode, setEditMode] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const res = await axios.get("/api/patients");
//       setPatients(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deletePatient = async (id) => {
//     try {
//       await axios.delete(`/api/patients/${id}`);
//       fetchPatients();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditClick = (patient) => {
//     setEditMode(patient._id);
//     setEditedData(patient);
//   };

//   const handleEditChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

//   const saveChanges = async () => {
//     try {
//       await axios.put(`/api/patients/${editMode}`, editedData);
//       setEditMode(null);
//       fetchPatients();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="main-container">
//       <nav className="navbar">
//         <div className="nav-links">
//           <span onClick={() => navigate("/dashboard")}>Dashboard</span>
//           <span onClick={() => navigate("/patients")}>Patients</span>
//           <span onClick={() => navigate("/register")}>Register</span>
//           <span onClick={() => navigate("/login")}>Logout</span>
//         </div>
//       </nav>

//       <h2 className="center-title">Dashboard</h2>

//       <div className="table-container">
//         <table className="patient-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th>Email</th>
//               <th>Contact</th>
//               <th>Blood Group</th>
//               <th>Disease</th>
//               <th>Admitted Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((patient) => (
//               <tr key={patient._id}>
//                 {editMode === patient._id ? (
//                   <>
//                     <td><input name="name" value={editedData.name} onChange={handleEditChange} /></td>
//                     <td><input name="age" value={editedData.age} onChange={handleEditChange} /></td>
//                     <td>
//                       <select name="gender" value={editedData.gender} onChange={handleEditChange}>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </td>
//                     <td><input name="email" value={editedData.email} onChange={handleEditChange} /></td>
//                     <td><input name="contact" value={editedData.contact} onChange={handleEditChange} /></td>
//                     <td><input name="bloodGroup" value={editedData.bloodGroup} onChange={handleEditChange} /></td>
//                     <td><input name="disease" value={editedData.disease} onChange={handleEditChange} /></td>
//                     <td><input type="date" name="admittedDate" value={editedData.admittedDate?.substring(0, 10)} onChange={handleEditChange} /></td>
//                     <td>
//                       <button className="blue-btn" onClick={saveChanges}>Save</button>
//                       <button className="red-btn" onClick={() => setEditMode(null)}>Cancel</button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td>{patient.name}</td>
//                     <td>{patient.age}</td>
//                     <td>{patient.gender}</td>
//                     <td>{patient.email}</td>
//                     <td>{patient.contact}</td>
//                     <td>{patient.bloodGroup}</td>
//                     <td>{patient.disease}</td>
//                     <td>{patient.admittedDate?.substring(0, 10)}</td>
//                     <td>
//                       <button className="blue-btn" onClick={() => handleEditClick(patient)}>Modify</button>
//                       <button className="red-btn" onClick={() => deletePatient(patient._id)}>Delete</button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.scss";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (patient) => {
    setEditMode(patient._id);
    setEditedData({
      ...patient,
      admittedDate: patient.admittedDate ? patient.admittedDate.substring(0, 10) : ""
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      const updatedPatient = {
        ...editedData,
        admittedDate: new Date(editedData.admittedDate)  // Convert back to proper date object
      };
      await axios.put(`/api/patients/${editMode}`, updatedPatient);
      setEditMode(null);
      setEditedData({});
      fetchPatients();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="nav-links">
          <span onClick={() => navigate("/dashboard")}>Dashboard</span>
          <span onClick={() => navigate("/patients")}>Patients</span>
          <span onClick={() => navigate("/register")}>Register</span>
          <span onClick={() => navigate("/login")}>Logout</span>
        </div>
      </nav>

      <h2 className="center-title">Dashboard</h2>

      <div className="table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Blood Group</th>
              <th>Disease</th>
              <th>Admitted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                {editMode === patient._id ? (
                  <>
                    <td><input name="name" value={editedData.name || ""} onChange={handleEditChange} /></td>
                    <td><input name="age" value={editedData.age || ""} onChange={handleEditChange} /></td>
                    <td>
                      <select name="gender" value={editedData.gender || ""} onChange={handleEditChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td><input name="email" value={editedData.email || ""} onChange={handleEditChange} /></td>
                    <td><input name="contact" value={editedData.contact || ""} onChange={handleEditChange} /></td>
                    <td><input name="bloodGroup" value={editedData.bloodGroup || ""} onChange={handleEditChange} /></td>
                    <td><input name="disease" value={editedData.disease || ""} onChange={handleEditChange} /></td>
                    <td><input type="date" name="admittedDate" value={editedData.admittedDate || ""} onChange={handleEditChange} /></td>
                    <td>
                      <button className="blue-btn" onClick={saveChanges}>Save</button>
                      <button className="red-btn" onClick={() => setEditMode(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.email}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.bloodGroup}</td>
                    <td>{patient.disease}</td>
                    <td>{patient.admittedDate?.substring(0, 10)}</td>
                    <td>
                      <button className="blue-btn" onClick={() => handleEditClick(patient)}>Modify</button>
                      <button className="red-btn" onClick={() => deletePatient(patient._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
