import instance from "../../config/axios"

const initialState = {
    Portofolios: [],
    Portofolio: {}
}

export default function portofolioReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PORTOFOLIOS':
            return { ...state, Portofolios: action.payload }
        case 'SET_PORTOFOLIO':
            return { ...state, Portofolio: action.payload }
        default:
            return state
    }
}

export function fetchPortofolios(token) {
    return async (dispatch) => {
        const { data } = await instance.get('user/freelance/portofolio', {
            headers: {
                access_token: token
            }
        })
        console.log(data, "portofolio");
        dispatch({ type: 'SET_PORTOFOLIOS', payload: data })
    }
}
