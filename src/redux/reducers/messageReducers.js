import {
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  CLEAR_MESSAGE,
} from "../constants/messageConstants";


const INITIAL_STATE = {
    success: "",
    error: ""
}

const messageReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case SHOW_SUCCESS_MESSAGE:
            return {
                ...state,
                success: action.payload
            }
        case SHOW_ERROR_MESSAGE:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_MESSAGE:
            return {
                success: "",
                error: ""
            }
    
        default:
            return state
    }
}
export default messageReducer