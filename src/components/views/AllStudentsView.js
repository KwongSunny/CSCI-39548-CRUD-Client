/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  student:{
    backgroundColor: '#DFD8DC', 
    display: 'inline-block', 
    minWidth: '300px',
    height: '98%', 
    float: 'left', 
    border: 'inset'
    
  }, 
  studentContainer:{
    display: 'flex',
    height: '500px',
    overflowX: 'auto', 
    whiteSpace: 'nowrap'
  },
  studentLink:{
    display: 'inline-block',
    textDecoration:'none', 
    color: '#111111'

  }
  

}));


const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  const classes = useStyles();
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>
      <div className = {classes.studentContainer}>
        {students.map((student) => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id} className = {classes.student}>
                <Link to={`/student/${student.id}`} className = {classes.studentLink} >
                  <h2>{name}</h2>
                </Link>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
                <hr/>
              </div>
            );
          }
        )}
      </div>
      <br/>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;