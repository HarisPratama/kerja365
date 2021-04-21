import instance from '../../config/axios'

const initialState = {
    Transactions: []
}

export default function applicantReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return { ...state, Transactions: action.payload }
        default:
            return state
    }
}

export function fetchTransactions(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/transaction', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_TRANSACTIONS', payload: data })
    }
}
