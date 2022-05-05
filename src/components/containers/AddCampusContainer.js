import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddCampusView } from "../views";
import {addCampusThunk} from '../../store/thunks';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class AddCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: null,
            description: "",
            createdAt: "",
            updatedAt: "",
            students: [],
            redirect: false,
            redirectId: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        if(this.getMissingFields().length > 0){

            toast.error("The following fields cannot be empty: " + this.getMissingFields().join(', '));
            return;
        }

        let campus = {
            name: this.state.name,
            id: this.state.id,
            address: this.state.address,
            description: this.state.description,
            updatedAt: this.state.updatedAt,
            createdAt: this.state.createdAt,
            students: this.state.students,
        }

        let newCampus = await this.props.addCampus(campus);

        this.setState({
            name:"",
            id:null,
            description: "",
            createdAt: "",
            updatedAt: "",
            students: [],
            redirect: true,
            redirectId: null
        })
    }

    getMissingFields = () => {
        let missingFields = [];
        if(!this.state.name) missingFields.push('name');
        if(!this.state.id) missingFields.push('id');
        if(!this.state.address) missingFields.push('address');
        if(!this.state.description) missingFields.push('description');
        return missingFields;
    }

  // Get all campuses data from back-end database
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null})

  }

  // Render All Campuses view by passing all campuses data as props to the corresponding View component
  render() {
    if(this.state.redirect){
        //return (<Redirect to={`/campuses/${this.state.redirectId}`}/>)
    }
    return (
      <div>
        <Header />
        <AddCampusView
            getMissingFields = {this.getMissingFields}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
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

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(AddCampusContainer);
