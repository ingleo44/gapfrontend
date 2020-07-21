import React from 'react';
import { connect } from 'react-redux'
import { fetchPatient, createAppointment, fetchAppointmentsByPatient, deleteAppointment } from '../../actions'
import moment from 'moment'
import AppointmentList from '../appointments/AppointmentList';
import AppointmentForm from '../appointments/AppointmentForm';
import ConfirmDialog from '../util/confirmDialog';

class PatientShow extends React.Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            showCreateAppointment: false,
            showConfirmDialog : false,
            deleteAppointmentId : null

            // Note: think carefully before initializing
            // state based on props!
        }
    }

    onAppointmentCreated = (param) => {
        this.setState({ showCreateAppointment: false });
        this.props.createAppointment(param);
    }

    onDeleteAppointment = (param) => {
        this.setState({ showConfirmDialog: true, deleteAppointmentId: param });
        
    }

    onAcceptConfirm = () =>{
        this.setState({ showConfirmDialog: false });
        this.props.deleteAppointment(this.state.deleteAppointmentId);        
    }

    onDiscardConfirm = () =>{
        this.setState({ showConfirmDialog: false });
        console.log("discarded");
    }

    onCloseConfirm = () =>{
        this.setState({ showConfirmDialog: false });
        console.log("close");
    }

    onCancelCreateAppointment() {
        this.setState({ showCreateAppointment: false });
    }

    onCreateAppointment() {
        this.setState({ showCreateAppointment: true });
    }


    componentDidMount() {
        this.props.fetchPatient(this.props.match.params.id);
    }

    render() {
        const showForm = this.state.showCreateAppointment;
        const errors = this.props.errors;
        if (!this.props.patient) {
            return <div>loading...</div>;
        }
        const { firstName, lastName, birthDate, address, phone, insuranceCompany } = this.props.patient;
        return (
            <div className="ui container">
               <ConfirmDialog open={this.state.showConfirmDialog} header="Confirm Delete" message="Are you sure you want to delete the appointment?" onClose={this.onCloseConfirm} onAccept={this.onAcceptConfirm} onDiscard={this.onDiscardConfirm}></ConfirmDialog>
                {
                    errors.data ?
                        <div class="ui negative message" >
                            <i class="close icon"></i>
                            <div class="header">
                                An Error Occured
                        </div>
                            <p>{errors.data}</p>
                        </div>
                        :
                        ''
                }






                <div>
                    <h1>{firstName} {lastName}</h1>
                    <h5>BirthDate: {moment(birthDate).format('DD/MM/yyyy')}</h5>
                    <h5>Address: {address}</h5>
                    <h5>Phone: {phone}</h5>
                    <h5>Insurance: {insuranceCompany}</h5>
                </div>
                <br />

                {showForm ?
                    <div>
                        <AppointmentForm patientId={this.props.patient.id} onCreateClicked={this.onAppointmentCreated} onCancelClicked={() => this.onCancelCreateAppointment()}></AppointmentForm>
                    </div>
                    : ''
                }



                <div>
                    <div><AppointmentList onCreateClicked={() => this.onCreateAppointment()} onDeleteClicked={this.onDeleteAppointment} patientId={this.props.match.params.id}></AppointmentList></div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return { patient: state.patients[ownProps.match.params.id], appointments: state.patients[ownProps.match.params.id], errors: state.errors }
}
export default connect(mapStateToProps, { fetchPatient, createAppointment, fetchAppointmentsByPatient, deleteAppointment })(PatientShow);