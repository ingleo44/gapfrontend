import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import patientReducer from './patientReducer';
import appointmentReducer from './appointmentReducer';
import appointmentTypeReducer from './appointmentTypeReducer';
import errorReducer from './errorReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
    form: formReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    appointmentTypes: appointmentTypeReducer,
    errors: errorReducer,
    authentication:authenticationReducer
});