import { useReducer } from "react";



const initialState = { // declare all initial states value here as a key value pair

};

const reducerFn = (state,action)=> {
    switch (action.type) { // declare all case based state changed logic here

        /* case '':
            
            return {...state, key : new_value}; */
    
        default:
            return state;
    }
}


const useStateReducer = () => {
    const [newState,dispatch] = useReducer(reducerFn,initialState);

    return [newState,dispatch];
}
export default useStateReducer;