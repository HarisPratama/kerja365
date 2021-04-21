const initialState = {
    Targets: []
}

export default function jobAppliedReducer(state = initialState, action) {
   switch (action.type) {
       case 'SET_PROJECT_TARGET':
            return {...state, Targets: action.payload} 
       default:
            return state
   } 
}
