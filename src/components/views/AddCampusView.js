import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const AddCampusView = (props) => {
    const {handleChange, handleSubmit} = props;

    return <div>
        <form>
            Campus Name: <input type = "text" name = "name" onChange={(e) => {handleChange(e)}}></input>
            Campus ID: <input type = "text" name = "id" onChange = {(e) => {handleChange(e)}}></input>
            Address: <input type = "text" name = "address" onChange = {(e) => {handleChange(e)}}></input>
            Description: <input type = "text" name = "description" onChange={(e) => {handleChange(e)}}></input>
            <input type = "submit" onClick={(e) => {handleSubmit(e)}}></input>
        </form>
    </div>
}

export default AddCampusView;