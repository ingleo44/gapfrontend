import React from 'react';
import {connect} from 'react-redux';
import {createPatient} from '../../actions/index';
import PatientForm from './PatientForm';


class PatientCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createPatient(formValues);
    }

    render() {

        return (
            <div className="ui container">
                <h3>Create a Patient</h3>
               <PatientForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}


export default connect(null, {createPatient})(PatientCreate);