
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
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

    let student = {
        id: this.state.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
    }

    this.props.editStudent(student)
  }
    
    componentDidMount(){
        this.props.fetchStudent(this.props.match.params.id).then(res => console.log('res: ', this.state));
        this.setState({
            firstname: this.props.student.firstname,
            lastname: this.props.student.lastname,
            email: this.props.student.email,
            campusId: this.props.student.campusId,
            gpa: this.props.student.gpa,
            id: this.props.student.id,
        });
        console.log('state: ', this.state);
    }

    render(){
        return (
            <div>
                <Header />
                <EditStudentView 
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    student = {this.props.student}
                />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      student: state.student,  // Get the State object from Reducer "campus"
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student))
    };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);