import {GET_ALL, GET_DETAIL, GET_COMMENTS} from '../actions'

const initialState = {
    all : null,
    issue: null,
    comments: null
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                all: action.payload
            } 
        case GET_DETAIL:
            return {
                ...state,
                issue: action.payload
            }      
        case GET_COMMENTS: return {
            ...state,
            comments: action.payload
        }           
        default :
        return state;    
    }
}

export default rootReducer