import {
        FETCH_APPOINTMENTS_BY_PATIENT,
            CREATE_APPOINTMENT, FETCH_APPOINTMENTS, DELETE_APPOINTMENT, FETCH_APPOINTMENT, EDIT_APPOINTMENT,
}

    from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {

        case CREATE_APPOINTMENT:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_APPOINTMENT:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_APPOINTMENTS:
            console.log(action.payload);
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_APPOINTMENTS_BY_PATIENT:
            console.log(action.payload);
            return {  ..._.mapKeys(action.payload, 'id') };
        case DELETE_APPOINTMENT:
            return _.omit(state, action.payload);
        case EDIT_APPOINTMENT:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};