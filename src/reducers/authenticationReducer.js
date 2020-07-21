import {
    AUTHENTICATION_LOGIN, AUTHENTICATION_LOGOUT
}

from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
switch (action.type) {
    case AUTHENTICATION_LOGIN:
        return { ...state, ...action.payload }
    case AUTHENTICATION_LOGOUT:
        return { ...state, data:null }
    default:
        return state;
}
};