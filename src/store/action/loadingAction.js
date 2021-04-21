export const setLoading = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_LOADING',
            payload: data
        })
    }
}