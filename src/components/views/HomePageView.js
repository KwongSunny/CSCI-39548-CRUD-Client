/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import campusImage from "../../photos/campus.png"
const useStyles = makeStyles(theme => ({
  
}));

const HomePageView = () => {
  const classes = useStyles();

  // Render Home page view
  return (
    <div className = {classes.homePage}  >
      <h1>Campus Home Page</h1>
      <div style={{width:"100%"}}>
      <img src= {campusImage}width="100%"/>
      </div>
    </div>
    
    
  );    
}

export default HomePageView;