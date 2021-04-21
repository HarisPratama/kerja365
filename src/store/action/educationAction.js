export const addEducation = (data) => {
    return (dispatch) => {
      return dispatch({
        type: 'ADD_EDUCATION',
        payload: data
      })
    }
  }
  