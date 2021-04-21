export const addCertification = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'ADD_CERTIFICATION',
            payload: data
        })
    }
}
