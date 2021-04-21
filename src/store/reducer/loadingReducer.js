const initialLayout = {
    Loading: false
}

export default function loadingReducer(state = initialLayout, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {...state, Loading: action.payload}
        default:
            return state
    }
}
