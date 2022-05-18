/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      campusId: this.props.location.state.campusId, 
      gpa: null,
      redirect: false,
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    let value = event.target.value;
    if(value === "") value = null; 
    
    this.setState({
        [event.target.name]: value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if(this.getMissingFields().length > 0){
      toast.error("The following fields cannot be empty: " + this.getMissingFields().join(', '));
      return;
    }

    if(!this.isValidCampusId(this.state.campusId) && this.state.campusId){
      toast.error("This campus id does not exist: " + this.state.campusId);
      return;
    }

    if(!this.isValidGPA(this.state.gpa) && this.state.gpa){
      return toast.error("The following GPA: " + this.state.gpa + " is not valid, please use a 4.0 GPA scale.");
    }

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
    };

    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      campusId: null, 
      gpa: null,
      redirect: true,
    });
  }

  getMissingFields = () => {
    let missingFields = [];
    if(!this.state.firstname) missingFields.push('First Name');
    if(!this.state.lastname) missingFields.push('Last Name');
    if(!this.state.email) missingFields.push('Email');
    return missingFields;
  }

  isValidCampusId = (id) =>{
    return !!this.props.allCampuses.find(campus => campus.id === parseInt(id));
  }

  isValidGPA = (gpa) => {
    return !(gpa > 4 || gpa < 0) && !isNaN(gpa);
  }

  componentDidMount() {
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/students`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campusId = {this.state.campusId}      
        />
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </div>          
    );
  }
}

const mapState = state => {
  return{
    allCampuses: state.allCampuses,
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);