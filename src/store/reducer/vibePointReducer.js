import instance from "../../config/axios"

const initialState = {
    Points: {}
}

export default function vipePointReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POINTS':
            return { ...state, Points: action.payload }
        default:
            return state
    }
}

export function fetchVibePoints(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/vibe-point', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_POINTS', payload: data })
    }
}
