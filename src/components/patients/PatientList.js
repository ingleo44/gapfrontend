import React from 'react';
import { connect } from 'react-redux';
import { fetchPatients } from '../../actions';
import {Link} from 'react-router-dom'



class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchPatients();
    }

    renderAdmin(patient) {
            return (
                <div className="right floated content">
                    <Link to={`/patients/edit/${patient.id}`} className="ui button primary">Edit</Link> 
                    <Link to={`/patients/delete/${patient.id}`} className="ui button negative">Delete</Link>
                </div>
            );            

    }
    renderCreate(){
        
            return (
                <div style={{textAlign:'right'}}>
                    <Link to='/patients/create' className="ui button primary">Create Patient</Link>
                </div>
            );
            
    }

    renderList() {
        return this.props.patients.map(patient => {
            return (
                <div className="item" key={patient.id}>
                {this.renderAdmin(patient)}                   
                    <div className="content">
                        <Link to={`/patients/show/${patient.id}`}>{patient.firstName} {patient.lastName}</Link>                                               
                    </div>
                </div>
            );
        })
    }

    render() {
        return (<div className="ui container">
            <h2>Patients</h2>          
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}
            
        </div>);
    }

};


const mapStateToProps = (state) => {
    return {
        patients: Object.values(state.patients)        
    }
};

export default connect(mapStateToProps, { fetchPatients })(StreamList);