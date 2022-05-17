/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  college:{
    backgroundColor: '#DFD8DC', 
    display: 'inline-block', 
    minWidth: '300px',
    height: '98%', 
    float: 'left', 
    border: 'inset'
    
  }, 
  collegeContainer:{
    display: 'flex',
    height: '500px',
    overflowX: 'auto', 
    whiteSpace: 'nowrap'
  },
  campusLink:{
    display: 'inline-block',
    textDecoration:'none', 
    color: '#111111'
  }

}));

const AllCampusesView = (props) => {
  const {fetchAllCampuses, deleteCampusAndRemoveStudents} = props;
  const classes = useStyles();

  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>
        <div>There are no campuses.</div>
        <Link to={`/addcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    )
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      <div className = {classes.collegeContainer}>
        {props.allCampuses.map((campus) => (
          <div key={campus.id} className = {classes.college}>
            <Link to={`/campus/${campus.id}`} className = {classes.campusLink}>
              <h2>{campus.name}</h2>
            </Link>
            <button onClick={e => {
              //Delete Campus
              deleteCampusAndRemoveStudents(campus.id);

              //refetch allCampuses
              fetchAllCampuses();
            }}>X</button>
            <br/><img src = {campus.imageUrl + "?random=" + campus.id}></img>
            <h4>campus id: {campus.id}</h4>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
          </div>
        ))}
      </div>

      <br/>
      <Link to={`/addcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;