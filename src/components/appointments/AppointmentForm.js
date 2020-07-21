import React from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentTypes, createAppointment } from '../../actions';

class AppointmentForm extends React.Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            appointmentDate: "",
            appointmentType: 1,
            appointmentTime: "00:00"

            // Note: think carefully before initializing
            // state based on props!
        }
    }




    renderError = ({ touched, valid, error }) => {
        if (touched && !valid) {
            return <div className="ui error message">{error}</div>
        }
    }


    renderInput = ({ input, label, meta }) => {
        const className = `field${meta.error && meta.touched ? 'error' : ''}`;
        console.log(meta);
        return (
            <div className={className}>
                <label>{label}</label>
                <input  {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onCancel = () => {
        return this.props.onCancelClicked();
    }

    handleCreate() {
        console.log("submitted");

        var newAppointment = {
            patientId: this.props.patientId,
            appointmentDate: `${this.state.appointmentDate}T${this.state.appointmentTime}:00`,
            appointmentTypeId: this.state.appointmentType
        }

        
        this.props.onCreateClicked(newAppointment);
    }

    componentDidMount() {
        this.props.fetchAppointmentTypes();
    }


    handleInputChange = (event)=> {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (!this.props.appointmentTypes) {
            return <div>loading...</div>;
        }


        return (
            <div className="ui segment">
                <form className="ui form">
                    <div className="field">
                        <label>Date</label>
                        <input type="date" name="appointmentDate" value={this.state.appointmentDate} autoComplete="off" onChange={this.handleInputChange} required />
                    </div>
                    <div className="field">
                    <label>Time</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" onChange={this.handleInputChange}
                            min="05:00" max="20:00" value={this.state.appointmentTime} required />
                    </div>

                    <div className="field">
                        <label>Type</label>
                        <select name="appointmentType" className="ui fluid dropdown" value={this.state.appointmentType} onChange={this.handleInputChange}>
                            {this.props.appointmentTypes.map((q) => (
                                <option key={q.id} value={q.id}>{q.name}</option>
                            ))}
                        </select>
                    </div>

                    <button className="ui button primary" type="button" onClick={()=>this.handleCreate()}>Submit</button>
                    <button className="ui button" onClick={() => this.onCancel()}>Cancel</button>
                </form>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        appointmentTypes: Object.values(state.appointmentTypes)
    }
};

export default connect(mapStateToProps, { fetchAppointmentTypes })(AppointmentForm);

