export const setUser = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_USER',
            payload: data
        })
    }
}

export const setToken = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_TOKEN',
            payload: data
        })
    }
}
