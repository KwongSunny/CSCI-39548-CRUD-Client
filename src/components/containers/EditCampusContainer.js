
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editCampusThunk, editStudentThunk, fetchCampusThunk } from "../../store/thunks";
import EditCampusView from '../views/EditCampusView';

class EditCampusContainer extends Component {
    // Capture input data when it is entered
    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });
    }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
    }

    this.props.editCampus(campus);
  }
    
    componentDidMount(){
        this.props.fetchCampus(this.props.match.params.id).then(res => console.log('res: ', this.state));
        this.setState({
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            id: this.props.campus.id,
        });
        console.log('state: ', this.state);
    }

    render(){
        return (
            <div>
                <Header />
                <EditCampusView 
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    campus = {this.props.campus}
                />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
      campus: state.campus,  // Get the State object from Reducer "campus"
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);