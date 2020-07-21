import {
    CREATE_PATIENT, FETCH_PATIENTS, DELETE_PATIENT, FETCH_PATIENT, EDIT_PATIENT
}

    from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {

        case CREATE_PATIENT:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_PATIENT:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_PATIENTS:
            console.log(action.payload);
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case DELETE_PATIENT:
            return _.omit(state, action.payload);
        case EDIT_PATIENT:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};