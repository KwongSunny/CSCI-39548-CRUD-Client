/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
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
                <h4>{name}</h4>
              </Link>             
            </div>
          );
        }):
        <div>
          This campus has no students.
        </div>
      }

    </div>
  );
};

export default CampusView;