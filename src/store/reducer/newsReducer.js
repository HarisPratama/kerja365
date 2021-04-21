const initialState = {
    News: []
}

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NEWS':
            return {...state, News: action.payload}
        default:
            return state
    }
}
