import React from 'react';
import { connect } from 'react-redux'
import { fetchPatient, editPatient } from '../../actions';
import PatientForm from './PatientForm'
import _ from 'lodash';
import moment from 'moment';



class PatientEdit extends React.Component {

    componentDidMount() {
        this.props.fetchPatient(this.props.match.params.id)
    }


    onSubmit = formValues => {
        this.props.editPatient(formValues);
    }

    render() {

        if (!this.props.patient) {
            return <div>loading...</div>
        }
        var initialValues = _.pick(this.props.patient, 'firstName', 'lastName', 'birthDate' , 'address','city','phone','insuranceCompany');
        initialValues.birthDate = moment(initialValues.birthDate).format('yyyy-MM-DD');
        return (
            <div className="ui container">
                <h3>Edit a Patient</h3>
                <PatientForm onSubmit={this.onSubmit}               
                    initialValues={initialValues} />
            </div>
        );
    };
}



const mapStateToProps = (state, ownProps) => {
    return { patient: state.patients[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPatient, editPatient })(PatientEdit);