import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NewCampusView } from "../views";
import {addCampusThunk} from '../../store/thunks';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            id: null,
            description: "",
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

        if(!this.isValidId(this.state.id)) return toast.error("Only integer values can be used for campus Id.")
        if(!this.isValidCampusId(this.state.id)) return toast.error("This Campus Id already exists.")

        let campus = {
            name: this.state.name,
            id: this.state.id,
            address: this.state.address,
            description: this.state.description,
            students: this.state.students,
        }

        let newCampus = await this.props.addCampus(campus);

        this.setState({
            name:"",
            id:null,
            description: "",
            // createdAt: "",
            // updatedAt: "",
            students: [],
            redirect: true,
            redirectId: null
        })
    }

    isValidId = id => {
        return !isNaN(id);
    }

    isValidCampusId = id => {
        return !this.props.allCampuses.find(campus => campus.id == id)
    }

    getMissingFields = () => {
        let missingFields = [];
        if(!this.state.name) missingFields.push('name');
        if(!this.state.id) missingFields.push('id');
        if(!this.state.address) missingFields.push('address');
        if(!this.state.description) missingFields.push('description');
        return missingFields;
    }

    componentDidMount(){
        console.log('allCampuses: ', this.props.allCampuses)
    }

  // Get all campuses data from back-end database
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null})

  }

  // Render All Campuses view by passing all campuses data as props to the corresponding View component
  render() {
    if(this.state.redirect){
        return (<Redirect to={`/campuses`}/>)
    }
    return (
      <div>
        <Header />
        <NewCampusView
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

const mapState = (state) => {
    return {
        allCampuses: state.allCampuses
    };
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(mapState, mapDispatch)(NewCampusContainer);
