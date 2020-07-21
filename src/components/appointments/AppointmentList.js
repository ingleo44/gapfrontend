import React from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentsByPatient } from '../../actions';
import moment from 'moment'



class AppointmentList extends React.Component {
    componentDidMount() {
        this.props.fetchAppointmentsByPatient(this.props.patientId);
    }

    renderAdmin(appointment) {
        return (
            <div className="right floated content">
                <button className="ui negative button" onClick={()=>this.onDeleteAppointment(appointment.id)} >
                    Delete
                </button>              
            </div>
        );

    }
    renderCreate() {

        return (
            <div style={{ textAlign: 'right' }}>
                <button className="ui primary button" onClick={()=>this.onCreateAppointment()}>
                    Create Appointment
                </button>             
            </div>
        );
    }

    onDeleteAppointment=(id)=>{
        return this.props.onDeleteClicked(id);
    }
    onCreateAppointment=()=>{
        return this.props.onCreateClicked();
    }

   
    renderList() {
        return this.props.appointments.map(appointment => {
            return (
                <div className="item" key={appointment.id}>
                    {this.renderAdmin(appointment)}
                    <div className="content">{moment(appointment.appointmentDate).format('DD/MM/YY hh:mm:ss')}
                    </div>
                    <div className="content">{appointment.appointmentType.name}
                    </div>
                </div>
            );
        })
    }

    render() {
        return (<div className="ui container">
            <h2>Appointments</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}

        </div>);
    }

};


const mapStateToProps = (state) => {
    return {
        appointments: Object.values(state.appointments)
    }
};

export default connect(mapStateToProps, { fetchAppointmentsByPatient })(AppointmentList);