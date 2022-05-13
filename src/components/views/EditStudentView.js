import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
    formContainer:{  
      width: '500px',
      backgroundColor: '#f0f0f5',
      borderRadius: '5px',
      margin: 'auto',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      textDecoration: 'none'
    }, 
    customizeAppBar:{
      backgroundColor: '#11153e',
      shadows: ['none'],
    },
    formTitle:{
      backgroundColor:'#c5c8d6',
      marginBottom: '15px',
      textAlign: 'center',
      borderRadius: '5px 5px 0px 0px',
      padding: '3px'
    },
}));

const EditStudentView = (props) => {
    const {student, handleChange, handleSubmit} = props;
    const classes = useStyles();
    const history = useHistory();

    return(
        <div className={classes.root}>
            <div className={classes.formContainer}>
            <div className={classes.formTitle}>
                <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Student
                </Typography>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={(e) => {handleSubmit(e); history.push(`/student/${student.id}`)}}>
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
                <input type="text" name="firstname" onChange ={(e) => handleChange(e)} defaultValue = {student.firstname}/>
                <br/>
                <br/>

                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
                <input type="text" name="lastname" onChange ={(e) => handleChange(e)} defaultValue = {student.lastname}/>
                <br/>
                <br/>

                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
                <input type="text" name="email" onChange ={(e) => handleChange(e)} defaultValue = {student.email}/>
                <br/>
                <br/>

                <label style= {{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
                <input type="text" name="gpa" onChange ={(e) => handleChange(e)} defaultValue = {student.gpa}/>
                <br/>
                <br/>

                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Campus ID: </label>
                <input type="text" name="campusId" onChange ={(e) => handleChange(e)} defaultValue = {student.campusId}/>
                <br/>
                <br/>

                <Button variant="contained" color="primary" type="submit">
                Submit
                </Button>
                <br/>
                <br/>
            </form>
            </div>
          </div>
    )
}

export default EditStudentView;