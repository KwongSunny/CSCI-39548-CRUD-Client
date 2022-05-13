import { Link, useHistory } from "react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student, deleteStudent } = props;
  let history = useHistory();

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}
      <Link to = {`/students/`}>
        <button 
          style = {{lineHeight:'1rem', verticalAlign:'middle'}}
          onClick={e => {
            e.preventDefault();
            deleteStudent(student.id);
            history.push('/students');
        }}>X</button>
      </Link>
      </h1>
      <img src = {student.imageUrl}></img>
      <h3>
        {"Campus: "}{student.campus?<Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>:<span>N/A</span>}
      </h3>
      <h3>Email: {student.email}</h3>
      <h3>GPA: {student.gpa}</h3>
    </div>
  );

};

export default StudentView;