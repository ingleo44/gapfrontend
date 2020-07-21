import {
   FETCH_APPOINTMENT_TYPES
}

from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
switch (action.type) {
    case FETCH_APPOINTMENT_TYPES:
        console.log(action.payload);
        return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
        return state;
}
};