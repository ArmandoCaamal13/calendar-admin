import { combineReducers } from "redux";
import { UPDATE_ACCORDION_DATA } from "./actions";

const initialState = {
    accordionData: []
}

const accordionReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_ACCORDION_DATA :
            return{ 
                ...state, 
                accordionData: action.payload
            };
        default: 
            return state;
    }
};


export default accordionReducer; 