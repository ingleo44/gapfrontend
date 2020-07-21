import {
    ADD_ERROR, REMOVE_ERROR, RESET_ERROR_MESSAGE
}

    from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
  
        case ADD_ERROR:
          return {...state,...action.error.response};
    
        case REMOVE_ERROR:
          return state.error.filter((error, i) => i !== action.index);
        case RESET_ERROR_MESSAGE:
            return {...state,data:null}
        default:
          return _.omit(state, action.payload);
      }
};

