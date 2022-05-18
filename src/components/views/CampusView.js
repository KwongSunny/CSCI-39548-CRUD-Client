/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const history = useHistory();
  const {campus, removeStudent, addStudent, allStudents} = props;
  const [addingStudent, setAddingStudent] = useState(false);

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}<Link to = {`/campus/${campus.id}/edit`}>+</Link></h1>
      <img src={campus.imageUrl}></img>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h3>Students</h3>
      {campus.students.length>0?
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (  
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <span style = {{fontWeight: 'bold'}}>{name}</span>
              </Link>
              <button onClick={() => {removeStudent(student.id)}}>X</button>             
            </div>
          );
        }):
        <div>
          This campus has no students.
        </div>
      }
      <br />
      <div>
        <button onClick = {() => {setAddingStudent(!addingStudent)}}>Add Existing Student</button>
        <button onClick = {() => {
          history.push('/newstudent', {campusId: campus.id})
        }}>Add New Student</button>
      </div>
      <br />
      <div>
        { addingStudent &&
          allStudents.map(student => {
            if(!campus.students.find(campusStudent => campusStudent.id === student.id)){
              return (
                <Link onClick={() => {
                  addStudent(student.id);
                }}>
                  <div style = {{fontWeight: 'bold'}}>{student.firstname + ' ' + student.lastname}</div>
                </Link>
              )
            }

          })
        }
      </div>
    </div>
  );
};

export default CampusView;