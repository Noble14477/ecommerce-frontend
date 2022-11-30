import { GET_NEW_ARRIVALS } from "../constants/filtterConstant"

const INITIAL_STATE ={
    newArrivals: []
}

const filtterReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case GET_NEW_ARRIVALS:
            return{
                newArrivals: [...action.payload]
            }
        
        default:
            return  state;
    }
}

export default filtterReducer