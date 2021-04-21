export const setApplication = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_APPLICATION',
            payload: data
        })
    }
}
