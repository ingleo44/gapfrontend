import streams from '../apis/appointments';
import history from '../history';
import {
   CREATE_PATIENT,
   FETCH_PATIENTS,
   EDIT_PATIENT,
   DELETE_PATIENT,
   FETCH_PATIENT,
   CREATE_APPOINTMENT,
   FETCH_APPOINTMENTS,
   FETCH_APPOINTMENT,
   EDIT_APPOINTMENT,
   DELETE_APPOINTMENT,
   FETCH_APPOINTMENTS_BY_PATIENT,
   FETCH_APPOINTMENT_TYPES,
   ADD_ERROR,
   RESET_ERROR_MESSAGE,
   AUTHENTICATION_LOGIN,
   AUTHENTICATION_LOGOUT
} from './types';

const token = localStorage.getItem('token');

export const createPatient = formValues => async (dispatch, getState) => {
   const response = await streams.post('/api/patient', { ...formValues }, { headers: { "Authorization": `Bearer ${token}` } });
   dispatch({ type: CREATE_PATIENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
   history.push('/');
};

export const fetchPatients = () => async dispatch => {
   const response = await streams.get('/api/patient', { headers: { "Authorization": `Bearer ${token}` } });
   dispatch({ type: FETCH_PATIENTS, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};

export const fetchPatient = (patientId) => async dispatch => {
   const response = await streams.get(`/api/patient/${patientId}`, { headers: { "Authorization": `Bearer ${token}` } });
   dispatch({ type: FETCH_PATIENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};

export const editPatient = (formValues) => async dispatch => {
   const response = await streams.patch(`/api/patient/`, formValues, { headers: { "Authorization": `Bearer ${token}` } });
   dispatch({ type: EDIT_PATIENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });

};

export const deletePatient = (patientId) => async dispatch => {
   await streams.delete(`/api/patient/${patientId}`, { headers: { "Authorization": `Bearer ${token}` } });
   dispatch({ type: DELETE_PATIENT, payload: patientId });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};



export const createAppointment = formValues => async (dispatch) => {
   streams.post('/api/Appointment', { ...formValues }, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
         streams.get(`/api/Appointment?$filter=id eq ${response.data.id}&$expand=appointmentType($select=name)`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((createdEntity) => {
               dispatch({ type: CREATE_APPOINTMENT, payload: createdEntity.data[0] });
               dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
            }
            );
      })
      .catch(err => {
         // Dispatch the generic "global errors" action
         // This is what makes its way into state.errors
         return dispatch({ type: ADD_ERROR, error: err });
      });

};

export const fetchAppointments = () => async dispatch => {
   const response = await streams.get('/api/Appointment', { headers: {"Authorization" : `Bearer ${token}`} });
   dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};


export const fetchAppointmentsByPatient = (patientId) => async dispatch => {
   const response = await streams.get(`/api/Appointment?$filter=patientId eq ${patientId}&$expand=appointmentType($select=name)`, { headers: {"Authorization" : `Bearer ${token}`} });
   dispatch({ type: FETCH_APPOINTMENTS_BY_PATIENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};

export const fetchAppointment = (AppointmentId) => async dispatch => {
   const response = await streams.get(`/api/Appointment/${AppointmentId}`, { headers: {"Authorization" : `Bearer ${token}`} });
   dispatch({ type: FETCH_APPOINTMENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};

export const editAppointment = (formValues) => async dispatch => {
   const response = await streams.patch(`/api/Appointment/`, formValues, { headers: {"Authorization" : `Bearer ${token}`} });
   dispatch({ type: EDIT_APPOINTMENT, payload: response.data });
   dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
};

export const deleteAppointment = (AppointmentId) => async dispatch => {
   await streams.delete(`/api/Appointment/${AppointmentId}`, { headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
      dispatch({ type: DELETE_APPOINTMENT, payload: AppointmentId });
      dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
   })
      .catch(err => {
         // Dispatch the generic "global errors" action
         // This is what makes its way into state.errors
         return dispatch({ type: ADD_ERROR, error: err });
      });

};




export const login = (formValues) => async dispatch => {
   await streams.post(`/api/Authentication/Login`, { ...formValues }).then((response) => {

      localStorage.setItem("token", response.data.data.token)


      dispatch({ type: AUTHENTICATION_LOGIN, payload: response.data });
      dispatch({ type: RESET_ERROR_MESSAGE, payload: null });
   })
      .catch(err => {
         // Dispatch the generic "global errors" action
         // This is what makes its way into state.errors
         localStorage.removeItem("token");
         return dispatch({ type: ADD_ERROR, error: err });
      });

};

export const logout = () => async dispatch => {
   localStorage.removeItem("token");
   history.push('/login');
   dispatch({ type: AUTHENTICATION_LOGOUT, payload: null });
};

export const fetchAppointmentTypes = () => async dispatch => {
   const response = await streams.get('/api/AppointmentType?$select=id,name', { headers: {"Authorization" : `Bearer ${token}`} });
   dispatch({ type: FETCH_APPOINTMENT_TYPES, payload: response.data });
};