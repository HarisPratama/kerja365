import instance from "../../config/axios"

const initialState = {
    BankAccounts: [],
    BankAccount: {}
}

export default function certificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BANK_ACCOUNTS':
            return { ...state, BankAccounts: action.payload }
        case 'SET_BANK_ACCOUNT':
            return { ...state, BankAccount: action.payload }
        default:
            return state
    }
}

export function fetchBankAccounts(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/bank-account', {
            headers: {
                access_token: token
            }
        })
        console.log(data, "<< data");
        dispatch({ type: 'SET_BANK_ACCOUNTS', payload: data })
    }
}

export function fetchBankAccount(token, id) {
    return async (dispatch) => {
        const { data } = await instance.get(`/bank-account/${id}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_BANK_ACCOUNT', payload: data })
    }
}
